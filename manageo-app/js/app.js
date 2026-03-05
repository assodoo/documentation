/**
 * Manageo - Main Application Logic
 */
const App = {
    currentPage: 'dashboard',
    currentModal: null,
    data: {},

    // ===== INITIALIZATION =====
    init() {
        this.loadData();
        this.bindEvents();
        this.renderDashboard();
        this.navigateTo('dashboard');
    },

    loadData() {
        const saved = localStorage.getItem('manageo_data');
        if (saved) {
            this.data = JSON.parse(saved);
        } else {
            this.data = JSON.parse(JSON.stringify(SampleData));
            this.saveData();
        }
    },

    saveData() {
        localStorage.setItem('manageo_data', JSON.stringify(this.data));
    },

    // ===== EVENT BINDING =====
    bindEvents() {
        // Sidebar navigation
        document.querySelectorAll('.menu-item').forEach(item => {
            item.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;

                // Handle submenu toggle
                if (item.classList.contains('has-submenu')) {
                    item.classList.toggle('open');
                }

                this.navigateTo(page);
            });
        });

        // Submenu items
        document.querySelectorAll('.submenu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const subpage = link.dataset.subpage;
                const parentPage = link.closest('.menu-item').dataset.page;
                this.navigateTo(parentPage);
                if (parentPage === 'ventes') {
                    this.loadVentesSubpage(subpage);
                } else if (parentPage === 'achats') {
                    this.loadAchatsSubpage(subpage);
                }
            });
        });

        // Quarter tabs
        document.querySelectorAll('.quarter-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.quarter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.updateQuarterData(parseInt(tab.dataset.quarter));
            });
        });

        // Search
        const searchInput = document.getElementById('global-search');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    this.globalSearch(searchInput.value);
                }
            });
        }
    },

    // ===== NAVIGATION =====
    navigateTo(page) {
        this.currentPage = page;

        // Update sidebar active state
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });

        // Update pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const pageEl = document.getElementById('page-' + page);
        if (pageEl) {
            pageEl.classList.add('active');
        }

        // Update breadcrumb
        const names = {
            dashboard: 'Tableau de bord', crm: 'CRM', sms: 'SMS', stock: 'Stock',
            ventes: 'Ventes', achats: 'Achats', finance: 'Finance', catalogue: 'Catalogue',
            comptabilite: 'Comptabilite', rh: 'Ressources Humaines', collaborateurs: 'Collaborateurs',
            manageo: 'Manageo', reglages: 'Reglages'
        };
        document.getElementById('breadcrumb-text').textContent = names[page] || page;

        // Render page content
        this.renderPage(page);
    },

    renderPage(page) {
        switch(page) {
            case 'dashboard': this.renderDashboard(); break;
            case 'crm': this.renderCRM(); break;
            case 'stock': this.renderStock(); break;
            case 'ventes': this.renderVentes(); break;
            case 'achats': this.renderAchats(); break;
            case 'finance': this.renderFinance(); break;
            case 'catalogue': this.renderCatalogue(); break;
            case 'comptabilite': this.renderComptabilite(); break;
            case 'rh': this.renderRH(); break;
            case 'collaborateurs': this.renderCollaborateurs(); break;
            case 'sms': this.renderSMS(); break;
        }
    },

    // ===== FORMATTING =====
    formatNumber(num) {
        if (num === undefined || num === null) return '0';
        return Math.abs(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },

    formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    },

    getStatusLabel(statut) {
        const labels = {
            draft: 'Brouillon', sent: 'Envoye', confirmed: 'Confirme', paid: 'Paye',
            cancelled: 'Annule', pending: 'En attente', active: 'Actif', inactive: 'Inactif',
            overdue: 'En retard', partial: 'Partiel', conge: 'En conge'
        };
        return labels[statut] || statut;
    },

    // ===== DASHBOARD =====
    renderDashboard() {
        this.renderFacturesList();
        this.renderDevisTable();
        this.renderCommandesTable();
    },

    renderFacturesList() {
        const container = document.getElementById('factures-list');
        if (!container) return;
        container.innerHTML = this.data.factures.map(f => `
            <div class="facture-row">
                <span class="facture-ref">${f.ref}</span>
                <span class="facture-client">${f.client}</span>
                <span class="facture-amount">${this.formatNumber(f.montant)}</span>
            </div>
        `).join('');
    },

    renderDevisTable() {
        const tbody = document.getElementById('devis-table-body');
        if (!tbody) return;
        const devisToShow = this.data.devis.filter(d => d.statut === 'sent').slice(0, 5);
        tbody.innerHTML = devisToShow.map(d => `
            <tr>
                <td><span class="facture-ref">${d.ref}</span></td>
                <td>${d.client}</td>
                <td>${this.formatDate(d.date)}</td>
                <td>${this.formatNumber(d.montantTTC)}</td>
                <td><span class="status-badge status-${d.statut}">${this.getStatusLabel(d.statut)}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-sm btn-outline" onclick="App.relancerDevis('${d.ref}')">Relancer</button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    renderCommandesTable() {
        const tbody = document.getElementById('commandes-table-body');
        if (!tbody) return;
        tbody.innerHTML = this.data.commandes.map(c => `
            <tr>
                <td><span class="facture-ref">${c.ref}</span></td>
                <td>${c.client}</td>
                <td>${this.formatDate(c.date)}</td>
                <td>${this.formatNumber(c.montantTTC)}</td>
                <td><span class="status-badge status-${c.statut}">${this.getStatusLabel(c.statut)}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-sm btn-primary" onclick="App.facturerCommande('${c.ref}')">Facturer</button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    updateQuarterData(quarter) {
        const qData = this.data.quarterData[quarter];
        if (!qData) return;
        document.getElementById('ca-total').textContent = this.formatNumber(qData.ca);
        document.getElementById('ca-value').textContent = this.formatNumber(qData.values[0]);
        const caRows = document.querySelectorAll('.ca-value');
        qData.values.forEach((val, i) => {
            if (caRows[i]) caRows[i].textContent = this.formatNumber(val);
        });
    },

    // ===== CRM =====
    renderCRM() {
        const stages = ['prospect', 'qualification', 'proposition', 'negociation', 'gagne'];
        stages.forEach(stage => {
            const container = document.getElementById('stage-' + stage);
            const countEl = document.getElementById('count-' + stage);
            if (!container) return;
            const items = this.data.crm.filter(c => c.stage === stage);
            countEl.textContent = items.length;
            container.innerHTML = items.map(c => `
                <div class="pipeline-card" draggable="true" data-id="${c.id}">
                    <div class="pipeline-card-name">${c.nom}</div>
                    <div class="pipeline-card-company">${c.entreprise}</div>
                    <div class="pipeline-card-amount">${this.formatNumber(c.montant)} FCFA</div>
                    <div class="pipeline-card-date">${this.formatDate(c.date)}</div>
                </div>
            `).join('');
        });
    },

    // ===== STOCK =====
    renderStock() {
        const products = this.data.produits;
        const lowStock = products.filter(p => p.quantite <= p.seuilAlerte);

        document.getElementById('stock-total-products').textContent = products.length;
        document.getElementById('stock-low').textContent = lowStock.length;
        document.getElementById('stock-in').textContent = '24';
        document.getElementById('stock-out').textContent = '18';

        const tbody = document.getElementById('stock-table-body');
        tbody.innerHTML = products.map(p => {
            const isLow = p.quantite <= p.seuilAlerte;
            return `
                <tr>
                    <td>${p.ref}</td>
                    <td>${p.nom}</td>
                    <td>${p.categorie}</td>
                    <td>${this.formatNumber(p.quantite)}</td>
                    <td>${this.formatNumber(p.prixUnitaire)}</td>
                    <td>${this.formatNumber(p.quantite * p.prixUnitaire)}</td>
                    <td><span class="status-badge ${isLow ? 'status-overdue' : 'status-active'}">${isLow ? 'Bas' : 'Normal'}</span></td>
                    <td>
                        <div class="action-btns">
                            <button class="btn btn-sm btn-outline" onclick="App.editProduct('${p.ref}')"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-outline" onclick="App.deleteProduct('${p.ref}')"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // ===== VENTES =====
    renderVentes() {
        document.getElementById('ventes-devis-count').textContent = this.data.devis.length;
        document.getElementById('ventes-commandes-count').textContent = this.data.commandes.length;
        document.getElementById('ventes-factures-count').textContent = this.data.factures.length;
        const totalCA = this.data.factures.reduce((sum, f) => sum + f.montant, 0);
        document.getElementById('ventes-ca-total').textContent = this.formatNumber(totalCA);
        this.loadVentesSubpage('devis');
    },

    loadVentesSubpage(subpage) {
        const tbody = document.getElementById('ventes-table-body');
        const title = document.getElementById('ventes-table-title');
        if (!tbody) return;

        let data = [];
        const titles = {
            'devis': 'Devis', 'commandes': 'Commandes', 'factures-ventes': 'Factures',
            'bons-livraison': 'Bons de livraison', 'avoirs-ventes': 'Avoirs'
        };
        title.textContent = titles[subpage] || subpage;

        if (subpage === 'devis') {
            data = this.data.devis;
        } else if (subpage === 'commandes') {
            data = this.data.commandes;
        } else if (subpage === 'factures-ventes') {
            data = this.data.factures.map(f => ({
                ref: f.ref, client: f.client, date: f.date,
                montantHT: Math.round(f.montant / 1.18), montantTTC: f.montant, statut: f.statut
            }));
        } else {
            data = [];
        }

        tbody.innerHTML = data.map(d => `
            <tr>
                <td><span class="facture-ref">${d.ref}</span></td>
                <td>${d.client}</td>
                <td>${this.formatDate(d.date)}</td>
                <td>${this.formatNumber(d.montantHT || 0)}</td>
                <td>${this.formatNumber(d.montantTTC || d.montant || 0)}</td>
                <td><span class="status-badge status-${d.statut}">${this.getStatusLabel(d.statut)}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-sm btn-outline" title="Voir"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-sm btn-outline" title="Editer"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-outline" title="PDF"><i class="fas fa-file-pdf"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Update select
        const select = document.getElementById('ventes-view-select');
        if (select) select.value = subpage;
    },

    // ===== ACHATS =====
    renderAchats() {
        const demandes = this.data.achats.filter(a => a.type === 'demandes-prix');
        const bons = this.data.achats.filter(a => a.type === 'bons-commande');
        const factures = this.data.achats.filter(a => a.type === 'factures-achats');

        document.getElementById('achats-demandes-count').textContent = demandes.length;
        document.getElementById('achats-bons-count').textContent = bons.length;
        document.getElementById('achats-factures-count').textContent = factures.length;
        const total = this.data.achats.reduce((sum, a) => sum + a.montantTTC, 0);
        document.getElementById('achats-total').textContent = this.formatNumber(total);

        this.loadAchatsSubpage('demandes-prix');
    },

    loadAchatsSubpage(subpage) {
        const tbody = document.getElementById('achats-table-body');
        const title = document.getElementById('achats-table-title');
        if (!tbody) return;

        const titles = {
            'demandes-prix': 'Demandes de prix', 'bons-commande': 'Bons de commande',
            'factures-achats': 'Factures', 'bons-reception': 'Bons de reception', 'avoirs-achats': 'Avoirs'
        };
        title.textContent = titles[subpage] || subpage;

        let data = this.data.achats.filter(a => a.type === subpage);

        tbody.innerHTML = data.map(d => `
            <tr>
                <td><span class="facture-ref">${d.ref}</span></td>
                <td>${d.fournisseur}</td>
                <td>${this.formatDate(d.date)}</td>
                <td>${this.formatNumber(d.montantHT)}</td>
                <td>${this.formatNumber(d.montantTTC)}</td>
                <td><span class="status-badge status-${d.statut}">${this.getStatusLabel(d.statut)}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-sm btn-outline" title="Voir"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-sm btn-outline" title="Editer"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-outline" title="PDF"><i class="fas fa-file-pdf"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');

        const select = document.getElementById('achats-view-select');
        if (select) select.value = subpage;
    },

    // ===== FINANCE =====
    renderFinance() {
        const transactions = this.data.transactions;
        const encaissements = transactions.filter(t => t.montant > 0).reduce((s, t) => s + t.montant, 0);
        const decaissements = transactions.filter(t => t.montant < 0).reduce((s, t) => s + Math.abs(t.montant), 0);
        const solde = encaissements - decaissements;

        document.getElementById('finance-encaissements').textContent = this.formatNumber(encaissements);
        document.getElementById('finance-decaissements').textContent = this.formatNumber(decaissements);
        document.getElementById('finance-solde').textContent = this.formatNumber(solde);
        document.getElementById('finance-tresorerie').textContent = this.formatNumber(solde + 45000000);

        const tbody = document.getElementById('finance-table-body');
        let runSolde = 45000000;
        tbody.innerHTML = transactions.map(t => {
            runSolde += t.montant;
            return `
                <tr>
                    <td>${this.formatDate(t.date)}</td>
                    <td>${t.description}</td>
                    <td><span class="status-badge ${t.type === 'encaissement' ? 'status-active' : 'status-overdue'}">${t.type === 'encaissement' ? 'Encaissement' : 'Decaissement'}</span></td>
                    <td style="color: ${t.montant > 0 ? 'var(--green)' : 'var(--red)'}; font-weight: 600;">
                        ${t.montant > 0 ? '+' : '-'} ${this.formatNumber(t.montant)}
                    </td>
                    <td>${this.formatNumber(runSolde)}</td>
                    <td>
                        <div class="action-btns">
                            <button class="btn btn-sm btn-outline"><i class="fas fa-eye"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // ===== CATALOGUE =====
    renderCatalogue() {
        const container = document.getElementById('catalogue-grid');
        const categories = [...new Set(this.data.produits.map(p => p.categorie))];
        const filterSelect = document.getElementById('catalogue-category-filter');

        filterSelect.innerHTML = '<option value="">Toutes les categories</option>' +
            categories.map(c => `<option value="${c}">${c}</option>`).join('');

        container.innerHTML = this.data.produits.map(p => {
            const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140'];
            const color = colors[Math.abs(p.ref.charCodeAt(4)) % colors.length];
            return `
                <div class="catalogue-item" data-category="${p.categorie}">
                    <div class="catalogue-item-img" style="background: linear-gradient(135deg, ${color}, ${color}dd)">
                        <i class="fas fa-pills"></i>
                    </div>
                    <div class="catalogue-item-body">
                        <div class="catalogue-item-name">${p.nom}</div>
                        <div class="catalogue-item-category">${p.categorie}</div>
                        <div class="catalogue-item-price">${this.formatNumber(p.prixUnitaire)} FCFA</div>
                        <div class="catalogue-item-stock">Stock: ${this.formatNumber(p.quantite)}</div>
                    </div>
                </div>
            `;
        }).join('');

        filterSelect.addEventListener('change', () => {
            const val = filterSelect.value;
            document.querySelectorAll('.catalogue-item').forEach(item => {
                item.style.display = (!val || item.dataset.category === val) ? '' : 'none';
            });
        });
    },

    // ===== COMPTABILITE =====
    renderComptabilite() {
        const ecritures = this.data.ecritures;
        const totalDebit = ecritures.reduce((s, e) => s + e.debit, 0);
        const totalCredit = ecritures.reduce((s, e) => s + e.credit, 0);

        document.getElementById('compta-journal-count').textContent = ecritures.length;
        document.getElementById('compta-debit').textContent = this.formatNumber(totalDebit);
        document.getElementById('compta-credit').textContent = this.formatNumber(totalCredit);

        const tbody = document.getElementById('compta-table-body');
        tbody.innerHTML = ecritures.map(e => `
            <tr>
                <td>${this.formatDate(e.date)}</td>
                <td>${e.piece}</td>
                <td>${e.compte}</td>
                <td>${e.libelle}</td>
                <td style="color: var(--blue); font-weight: 600;">${e.debit ? this.formatNumber(e.debit) : ''}</td>
                <td style="color: var(--red); font-weight: 600;">${e.credit ? this.formatNumber(e.credit) : ''}</td>
            </tr>
        `).join('');
    },

    // ===== RH =====
    renderRH() {
        const employes = this.data.employes;
        const actifs = employes.filter(e => e.statut === 'active');
        const enConge = employes.filter(e => e.statut === 'conge');
        const masseSalariale = employes.reduce((s, e) => s + e.salaire, 0);

        document.getElementById('rh-effectif').textContent = employes.length;
        document.getElementById('rh-presents').textContent = actifs.length;
        document.getElementById('rh-conges').textContent = enConge.length;
        document.getElementById('rh-masse-salariale').textContent = this.formatNumber(masseSalariale);

        const tbody = document.getElementById('rh-table-body');
        tbody.innerHTML = employes.map(e => `
            <tr>
                <td>${e.matricule}</td>
                <td>${e.nom}</td>
                <td>${e.poste}</td>
                <td>${e.departement}</td>
                <td>${this.formatDate(e.dateEmbauche)}</td>
                <td><span class="status-badge status-${e.statut}">${this.getStatusLabel(e.statut)}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-sm btn-outline"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-sm btn-outline"><i class="fas fa-edit"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    // ===== COLLABORATEURS =====
    renderCollaborateurs() {
        const container = document.getElementById('collaborateurs-grid');
        container.innerHTML = this.data.collaborateurs.map(c => `
            <div class="collaborateur-card">
                <div class="collaborateur-avatar">${c.initiales}</div>
                <div class="collaborateur-info">
                    <div class="collaborateur-name">${c.nom}</div>
                    <div class="collaborateur-role">${c.role}</div>
                    <div class="collaborateur-email">${c.email}</div>
                </div>
            </div>
        `).join('');
    },

    // ===== SMS =====
    renderSMS() {
        document.getElementById('sms-envoyes').textContent = '1,245';
        document.getElementById('sms-delivres').textContent = '1,198';
        document.getElementById('sms-en-attente').textContent = '47';
        document.getElementById('sms-credits').textContent = '8,755';

        const tbody = document.getElementById('sms-table-body');
        tbody.innerHTML = `
            <tr>
                <td>Promo Mars 2026</td>
                <td>01/03/2026</td>
                <td>500</td>
                <td>498</td>
                <td>495</td>
                <td><span class="status-badge status-active">Termine</span></td>
            </tr>
            <tr>
                <td>Relance clients</td>
                <td>15/02/2026</td>
                <td>320</td>
                <td>318</td>
                <td>310</td>
                <td><span class="status-badge status-active">Termine</span></td>
            </tr>
            <tr>
                <td>Nouveaux produits</td>
                <td>28/02/2026</td>
                <td>425</td>
                <td>420</td>
                <td>393</td>
                <td><span class="status-badge status-active">Termine</span></td>
            </tr>
        `;
    },

    // ===== MODALS =====
    showModal(type) {
        this.currentModal = type;
        const overlay = document.getElementById('modal-overlay');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');

        const modals = {
            crm: { title: 'Nouveau contact CRM', html: this.getCRMForm() },
            product: { title: 'Nouveau produit', html: this.getProductForm() },
            vente: { title: 'Nouveau devis', html: this.getVenteForm() },
            achat: { title: 'Nouveau bon de commande', html: this.getAchatForm() },
            transaction: { title: 'Nouvelle transaction', html: this.getTransactionForm() },
            catalogue: { title: 'Nouveau produit catalogue', html: this.getProductForm() },
            ecriture: { title: 'Nouvelle ecriture', html: this.getEcritureForm() },
            employe: { title: 'Nouvel employe', html: this.getEmployeForm() },
            collaborateur: { title: 'Nouveau collaborateur', html: this.getCollaborateurForm() },
            sms: { title: 'Nouvelle campagne SMS', html: this.getSMSForm() },
        };

        const modal = modals[type];
        if (modal) {
            title.textContent = modal.title;
            body.innerHTML = modal.html;
        }

        overlay.classList.add('active');
    },

    closeModal() {
        document.getElementById('modal-overlay').classList.remove('active');
        this.currentModal = null;
    },

    saveModal() {
        const type = this.currentModal;
        if (!type) return;

        switch(type) {
            case 'crm': this.saveCRM(); break;
            case 'product':
            case 'catalogue': this.saveProduct(); break;
            case 'vente': this.saveVente(); break;
            case 'achat': this.saveAchat(); break;
            case 'transaction': this.saveTransaction(); break;
            case 'ecriture': this.saveEcriture(); break;
            case 'employe': this.saveEmploye(); break;
            case 'collaborateur': this.saveCollaborateur(); break;
            case 'sms': this.saveSMS(); break;
        }
    },

    // ===== FORM TEMPLATES =====
    getCRMForm() {
        return `
            <div class="form-grid">
                <div class="form-group"><label>Nom</label><input type="text" class="form-input" id="f-crm-nom"></div>
                <div class="form-group"><label>Entreprise</label><input type="text" class="form-input" id="f-crm-entreprise"></div>
                <div class="form-group"><label>Montant estime</label><input type="number" class="form-input" id="f-crm-montant"></div>
                <div class="form-group"><label>Etape</label>
                    <select class="select-input" id="f-crm-stage">
                        <option value="prospect">Prospect</option>
                        <option value="qualification">Qualification</option>
                        <option value="proposition">Proposition</option>
                        <option value="negociation">Negociation</option>
                        <option value="gagne">Gagne</option>
                    </select>
                </div>
            </div>
        `;
    },

    getProductForm() {
        return `
            <div class="form-grid">
                <div class="form-group"><label>Reference</label><input type="text" class="form-input" id="f-prod-ref" placeholder="PRD-XXX"></div>
                <div class="form-group"><label>Designation</label><input type="text" class="form-input" id="f-prod-nom"></div>
                <div class="form-group"><label>Categorie</label><input type="text" class="form-input" id="f-prod-cat"></div>
                <div class="form-group"><label>Quantite</label><input type="number" class="form-input" id="f-prod-qty" value="0"></div>
                <div class="form-group"><label>Prix unitaire</label><input type="number" class="form-input" id="f-prod-prix" value="0"></div>
                <div class="form-group"><label>Seuil d'alerte</label><input type="number" class="form-input" id="f-prod-seuil" value="100"></div>
            </div>
        `;
    },

    getVenteForm() {
        return `
            <div class="form-grid">
                <div class="form-group"><label>Client</label><input type="text" class="form-input" id="f-vente-client"></div>
                <div class="form-group"><label>Date</label><input type="date" class="form-input" id="f-vente-date" value="${new Date().toISOString().split('T')[0]}"></div>
                <div class="form-group"><label>Montant HT</label><input type="number" class="form-input" id="f-vente-ht" value="0"></div>
                <div class="form-group"><label>TVA (%)</label><input type="number" class="form-input" id="f-vente-tva" value="18"></div>
            </div>
        `;
    },

    getAchatForm() {
        return `
            <div class="form-grid">
                <div class="form-group"><label>Fournisseur</label><input type="text" class="form-input" id="f-achat-fournisseur"></div>
                <div class="form-group"><label>Date</label><input type="date" class="form-input" id="f-achat-date" value="${new Date().toISOString().split('T')[0]}"></div>
                <div class="form-group"><label>Montant HT</label><input type="number" class="form-input" id="f-achat-ht" value="0"></div>
                <div class="form-group"><label>Type</label>
                    <select class="select-input" id="f-achat-type">
                        <option value="demandes-prix">Demande de prix</option>
                        <option value="bons-commande">Bon de commande</option>
                        <option value="factures-achats">Facture</option>
                    </select>
                </div>
            </div>
        `;
    },

    getTransactionForm() {
        return `
            <div class="form-grid">
                <div class="form-group"><label>Description</label><input type="text" class="form-input" id="f-trans-desc"></div>
                <div class="form-group"><label>Date</label><input type="date" class="form-input" id="f-trans-date" value="${new Date().toISOString().split('T')[0]}"></div>
                <div class="form-group"><label>Montant</label><input type="number" class="form-input" id="f-trans-montant" value="0"></div>
                <div class="form-group"><label>Type</label>
                    <select class="select-input" id="f-trans-type">
                        <option value="encaissement">Encaissement</option>
                        <option value="decaissement">Decaissement</option>
                    </select>
                </div>
            </div>
        `;
    },

    getEcritureForm() {
        return `
            <div class="form-grid">
                <div class="form-group"><label>Date</label><input type="date" class="form-input" id="f-ecr-date" value="${new Date().toISOString().split('T')[0]}"></div>
                <div class="form-group"><label>N. Piece</label><input type="text" class="form-input" id="f-ecr-piece"></div>
                <div class="form-group"><label>Compte</label><input type="text" class="form-input" id="f-ecr-compte" placeholder="411000"></div>
                <div class="form-group"><label>Libelle</label><input type="text" class="form-input" id="f-ecr-libelle"></div>
                <div class="form-group"><label>Debit</label><input type="number" class="form-input" id="f-ecr-debit" value="0"></div>
                <div class="form-group"><label>Credit</label><input type="number" class="form-input" id="f-ecr-credit" value="0"></div>
            </div>
        `;
    },

    getEmployeForm() {
        return `
            <div class="form-grid">
                <div class="form-group"><label>Nom complet</label><input type="text" class="form-input" id="f-emp-nom"></div>
                <div class="form-group"><label>Poste</label><input type="text" class="form-input" id="f-emp-poste"></div>
                <div class="form-group"><label>Departement</label><input type="text" class="form-input" id="f-emp-dept"></div>
                <div class="form-group"><label>Date embauche</label><input type="date" class="form-input" id="f-emp-date" value="${new Date().toISOString().split('T')[0]}"></div>
                <div class="form-group"><label>Salaire</label><input type="number" class="form-input" id="f-emp-salaire" value="0"></div>
            </div>
        `;
    },

    getCollaborateurForm() {
        return `
            <div class="form-grid">
                <div class="form-group"><label>Nom complet</label><input type="text" class="form-input" id="f-collab-nom"></div>
                <div class="form-group"><label>Role</label><input type="text" class="form-input" id="f-collab-role"></div>
                <div class="form-group"><label>Email</label><input type="email" class="form-input" id="f-collab-email"></div>
            </div>
        `;
    },

    getSMSForm() {
        return `
            <div class="form-grid">
                <div class="form-group"><label>Nom campagne</label><input type="text" class="form-input" id="f-sms-nom"></div>
                <div class="form-group"><label>Date envoi</label><input type="date" class="form-input" id="f-sms-date" value="${new Date().toISOString().split('T')[0]}"></div>
                <div class="form-group" style="grid-column: 1/-1"><label>Message</label><textarea class="form-input" id="f-sms-message" rows="3"></textarea></div>
                <div class="form-group"><label>Destinataires</label><input type="number" class="form-input" id="f-sms-dest" value="0"></div>
            </div>
        `;
    },

    // ===== SAVE METHODS =====
    saveCRM() {
        const nom = document.getElementById('f-crm-nom').value;
        const entreprise = document.getElementById('f-crm-entreprise').value;
        const montant = parseInt(document.getElementById('f-crm-montant').value) || 0;
        const stage = document.getElementById('f-crm-stage').value;
        if (!nom) { this.showToast('Veuillez remplir le nom', 'error'); return; }
        const id = Math.max(...this.data.crm.map(c => c.id), 0) + 1;
        this.data.crm.push({ id, nom, entreprise, montant, stage, date: new Date().toISOString().split('T')[0] });
        this.saveData();
        this.closeModal();
        this.renderCRM();
        this.showToast('Contact CRM ajoute avec succes', 'success');
    },

    saveProduct() {
        const ref = document.getElementById('f-prod-ref').value;
        const nom = document.getElementById('f-prod-nom').value;
        const categorie = document.getElementById('f-prod-cat').value;
        const quantite = parseInt(document.getElementById('f-prod-qty').value) || 0;
        const prixUnitaire = parseInt(document.getElementById('f-prod-prix').value) || 0;
        const seuilAlerte = parseInt(document.getElementById('f-prod-seuil').value) || 100;
        if (!ref || !nom) { this.showToast('Veuillez remplir la reference et le nom', 'error'); return; }
        this.data.produits.push({ ref, nom, categorie, quantite, prixUnitaire, seuilAlerte });
        this.saveData();
        this.closeModal();
        this.renderPage(this.currentPage);
        this.showToast('Produit ajoute avec succes', 'success');
    },

    saveVente() {
        const client = document.getElementById('f-vente-client').value;
        const date = document.getElementById('f-vente-date').value;
        const montantHT = parseInt(document.getElementById('f-vente-ht').value) || 0;
        const tva = parseInt(document.getElementById('f-vente-tva').value) || 18;
        if (!client) { this.showToast('Veuillez remplir le client', 'error'); return; }
        const montantTTC = Math.round(montantHT * (1 + tva / 100));
        const num = String(this.data.devis.length + 112).padStart(4, '0');
        const ref = `D-${date.substring(0,7).replace('-', '')}-${num}`;
        this.data.devis.push({ ref, client, montantHT, montantTTC, date, statut: 'draft' });
        this.saveData();
        this.closeModal();
        this.renderVentes();
        this.showToast('Devis cree avec succes', 'success');
    },

    saveAchat() {
        const fournisseur = document.getElementById('f-achat-fournisseur').value;
        const date = document.getElementById('f-achat-date').value;
        const montantHT = parseInt(document.getElementById('f-achat-ht').value) || 0;
        const type = document.getElementById('f-achat-type').value;
        if (!fournisseur) { this.showToast('Veuillez remplir le fournisseur', 'error'); return; }
        const montantTTC = Math.round(montantHT * 1.18);
        const prefixes = { 'demandes-prix': 'DP', 'bons-commande': 'BC', 'factures-achats': 'FA' };
        const num = String(this.data.achats.length + 503).padStart(4, '0');
        const ref = `${prefixes[type]}-${date.substring(0,7).replace('-', '')}-${num}`;
        this.data.achats.push({ ref, fournisseur, montantHT, montantTTC, date, statut: 'draft', type });
        this.saveData();
        this.closeModal();
        this.renderAchats();
        this.showToast('Document achat cree avec succes', 'success');
    },

    saveTransaction() {
        const description = document.getElementById('f-trans-desc').value;
        const date = document.getElementById('f-trans-date').value;
        let montant = parseInt(document.getElementById('f-trans-montant').value) || 0;
        const type = document.getElementById('f-trans-type').value;
        if (!description) { this.showToast('Veuillez remplir la description', 'error'); return; }
        if (type === 'decaissement') montant = -Math.abs(montant);
        this.data.transactions.unshift({ date, description, type, montant });
        this.saveData();
        this.closeModal();
        this.renderFinance();
        this.showToast('Transaction ajoutee avec succes', 'success');
    },

    saveEcriture() {
        const date = document.getElementById('f-ecr-date').value;
        const piece = document.getElementById('f-ecr-piece').value;
        const compte = document.getElementById('f-ecr-compte').value;
        const libelle = document.getElementById('f-ecr-libelle').value;
        const debit = parseInt(document.getElementById('f-ecr-debit').value) || 0;
        const credit = parseInt(document.getElementById('f-ecr-credit').value) || 0;
        if (!piece || !compte) { this.showToast('Veuillez remplir les champs obligatoires', 'error'); return; }
        this.data.ecritures.unshift({ date, piece, compte, libelle, debit, credit });
        this.saveData();
        this.closeModal();
        this.renderComptabilite();
        this.showToast('Ecriture ajoutee avec succes', 'success');
    },

    saveEmploye() {
        const nom = document.getElementById('f-emp-nom').value;
        const poste = document.getElementById('f-emp-poste').value;
        const departement = document.getElementById('f-emp-dept').value;
        const dateEmbauche = document.getElementById('f-emp-date').value;
        const salaire = parseInt(document.getElementById('f-emp-salaire').value) || 0;
        if (!nom) { this.showToast('Veuillez remplir le nom', 'error'); return; }
        const num = String(this.data.employes.length + 1).padStart(3, '0');
        this.data.employes.push({ matricule: `EMP-${num}`, nom, poste, departement, dateEmbauche, statut: 'active', salaire });
        this.saveData();
        this.closeModal();
        this.renderRH();
        this.showToast('Employe ajoute avec succes', 'success');
    },

    saveCollaborateur() {
        const nom = document.getElementById('f-collab-nom').value;
        const role = document.getElementById('f-collab-role').value;
        const email = document.getElementById('f-collab-email').value;
        if (!nom) { this.showToast('Veuillez remplir le nom', 'error'); return; }
        const initiales = nom.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
        this.data.collaborateurs.push({ nom, role, email, initiales });
        this.saveData();
        this.closeModal();
        this.renderCollaborateurs();
        this.showToast('Collaborateur ajoute avec succes', 'success');
    },

    saveSMS() {
        this.closeModal();
        this.showToast('Campagne SMS creee avec succes', 'success');
    },

    // ===== ACTIONS =====
    relancerDevis(ref) {
        const devis = this.data.devis.find(d => d.ref === ref);
        if (devis) {
            this.showToast(`Relance envoyee pour le devis ${ref}`, 'info');
        }
    },

    facturerCommande(ref) {
        const cmd = this.data.commandes.find(c => c.ref === ref);
        if (cmd) {
            const fRef = `F-${cmd.date.substring(0,7).replace('-', '')}-${String(this.data.factures.length + 5710).padStart(4, '0')}`;
            this.data.factures.unshift({
                ref: fRef, client: cmd.client, montant: cmd.montantTTC,
                date: new Date().toISOString().split('T')[0], statut: 'sent'
            });
            cmd.statut = 'confirmed';
            this.saveData();
            this.renderDashboard();
            this.showToast(`Facture ${fRef} creee pour la commande ${ref}`, 'success');
        }
    },

    editProduct(ref) {
        this.showToast(`Edition du produit ${ref}`, 'info');
    },

    deleteProduct(ref) {
        if (confirm(`Supprimer le produit ${ref} ?`)) {
            this.data.produits = this.data.produits.filter(p => p.ref !== ref);
            this.saveData();
            this.renderStock();
            this.showToast('Produit supprime', 'success');
        }
    },

    saveCompanyInfo() {
        this.showToast('Informations de l\'entreprise enregistrees', 'success');
    },

    globalSearch(query) {
        if (!query.trim()) return;
        this.showToast(`Recherche: "${query}"`, 'info');
    },

    // ===== TOAST =====
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast ' + type + ' show';
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    },
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
