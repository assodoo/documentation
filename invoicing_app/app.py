from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///invoicing.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'dev-secret-key-facturation'

db = SQLAlchemy(app)

TAUX_TVA = 0.18


# ── Modèles ──────────────────────────────────────────────────────────────────

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200))
    telephone = db.Column(db.String(50))
    adresse = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    factures = db.relationship('Facture', backref='client', lazy=True)


class Facture(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    numero = db.Column(db.String(20), unique=True, nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    date_facture = db.Column(db.Date, default=date.today)
    total_ht = db.Column(db.Float, default=0.0)
    total_tva = db.Column(db.Float, default=0.0)
    total_ttc = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    lignes = db.relationship('LigneFacture', backref='facture', lazy=True,
                             cascade='all, delete-orphan')


class LigneFacture(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    facture_id = db.Column(db.Integer, db.ForeignKey('facture.id'), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    quantite = db.Column(db.Float, nullable=False, default=1)
    prix_unitaire = db.Column(db.Float, nullable=False)
    montant_ht = db.Column(db.Float, nullable=False)


# ── Helpers ──────────────────────────────────────────────────────────────────

def generer_numero_facture():
    year = datetime.now().year
    last = Facture.query.filter(
        Facture.numero.like(f'FAC-{year}-%')
    ).order_by(Facture.id.desc()).first()
    if last:
        seq = int(last.numero.split('-')[-1]) + 1
    else:
        seq = 1
    return f'FAC-{year}-{seq:04d}'


@app.template_filter('fcfa')
def formater_fcfa(value):
    if value is None:
        return '0 FCFA'
    return f'{value:,.0f} FCFA'.replace(',', ' ')


# ── Routes ───────────────────────────────────────────────────────────────────

@app.route('/')
def dashboard():
    nb_clients = Client.query.count()
    nb_factures = Facture.query.count()
    revenue = db.session.query(db.func.sum(Facture.total_ttc)).scalar() or 0
    return render_template('dashboard.html',
                           nb_clients=nb_clients,
                           nb_factures=nb_factures,
                           revenue=revenue)


# ── Clients ──

@app.route('/clients')
def liste_clients():
    clients = Client.query.order_by(Client.nom).all()
    return render_template('clients.html', clients=clients)


@app.route('/clients/nouveau', methods=['GET', 'POST'])
def nouveau_client():
    if request.method == 'POST':
        client = Client(
            nom=request.form['nom'],
            email=request.form.get('email', ''),
            telephone=request.form.get('telephone', ''),
            adresse=request.form.get('adresse', ''),
        )
        db.session.add(client)
        db.session.commit()
        flash('Client créé avec succès.', 'success')
        return redirect(url_for('liste_clients'))
    return render_template('client_form.html', client=None)


@app.route('/clients/<int:id>/modifier', methods=['GET', 'POST'])
def modifier_client(id):
    client = Client.query.get_or_404(id)
    if request.method == 'POST':
        client.nom = request.form['nom']
        client.email = request.form.get('email', '')
        client.telephone = request.form.get('telephone', '')
        client.adresse = request.form.get('adresse', '')
        db.session.commit()
        flash('Client modifié avec succès.', 'success')
        return redirect(url_for('liste_clients'))
    return render_template('client_form.html', client=client)


@app.route('/clients/<int:id>/supprimer', methods=['POST'])
def supprimer_client(id):
    client = Client.query.get_or_404(id)
    if client.factures:
        flash('Impossible de supprimer ce client : il a des factures associées.', 'danger')
        return redirect(url_for('liste_clients'))
    db.session.delete(client)
    db.session.commit()
    flash('Client supprimé.', 'success')
    return redirect(url_for('liste_clients'))


# ── Factures ──

@app.route('/factures')
def liste_factures():
    factures = Facture.query.order_by(Facture.date_facture.desc()).all()
    return render_template('invoices.html', factures=factures)


@app.route('/factures/nouvelle', methods=['GET', 'POST'])
def nouvelle_facture():
    if request.method == 'POST':
        client_id = request.form['client_id']
        date_str = request.form.get('date_facture', '')
        date_facture = datetime.strptime(date_str, '%Y-%m-%d').date() if date_str else date.today()

        facture = Facture(
            numero=generer_numero_facture(),
            client_id=client_id,
            date_facture=date_facture,
        )
        db.session.add(facture)
        db.session.flush()

        descriptions = request.form.getlist('descriptions')
        quantites = request.form.getlist('quantites')
        prix_unitaires = request.form.getlist('prix_unitaires')

        total_ht = 0
        for desc, qte, prix in zip(descriptions, quantites, prix_unitaires):
            if not desc.strip():
                continue
            qte_f = float(qte)
            prix_f = float(prix)
            montant_ht = qte_f * prix_f
            total_ht += montant_ht
            ligne = LigneFacture(
                facture_id=facture.id,
                description=desc,
                quantite=qte_f,
                prix_unitaire=prix_f,
                montant_ht=round(montant_ht, 0),
            )
            db.session.add(ligne)

        facture.total_ht = round(total_ht, 0)
        facture.total_tva = round(total_ht * TAUX_TVA, 0)
        facture.total_ttc = round(total_ht + total_ht * TAUX_TVA, 0)
        db.session.commit()
        flash(f'Facture {facture.numero} créée avec succès.', 'success')
        return redirect(url_for('detail_facture', id=facture.id))

    clients = Client.query.order_by(Client.nom).all()
    return render_template('invoice_form.html', clients=clients, today=date.today())


@app.route('/factures/<int:id>')
def detail_facture(id):
    facture = Facture.query.get_or_404(id)
    return render_template('invoice_detail.html', facture=facture)


@app.route('/factures/<int:id>/supprimer', methods=['POST'])
def supprimer_facture(id):
    facture = Facture.query.get_or_404(id)
    db.session.delete(facture)
    db.session.commit()
    flash(f'Facture {facture.numero} supprimée.', 'success')
    return redirect(url_for('liste_factures'))


# ── Main ─────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
