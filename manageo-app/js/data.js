/**
 * Manageo - Sample Data Store
 * All data is stored in localStorage for persistence
 */
const SampleData = {
    factures: [
        { ref: 'F-202601-5576', client: 'CENTRE SANTE MA', montant: 440000, date: '2026-01-15', statut: 'paid' },
        { ref: 'F-202602-5625', client: 'HOPITAL ELHADJI', montant: 509041, date: '2026-02-03', statut: 'sent' },
        { ref: 'F-202601-5586', client: 'CENTRE HOSPITAL', montant: 4480000, date: '2026-01-20', statut: 'paid' },
        { ref: 'F-202602-5646', client: 'CENTRE HOSPITAL', montant: 1961942, date: '2026-02-08', statut: 'sent' },
        { ref: 'F-202602-5628', client: 'CENTRE HOSPITAL', montant: 3448684, date: '2026-02-05', statut: 'overdue' },
        { ref: 'F-202602-5675', client: 'LABORATOIRE BIO', montant: 219800, date: '2026-02-12', statut: 'paid' },
        { ref: 'F-202602-5664', client: 'HOPITAL ELHADJI', montant: 65555, date: '2026-02-10', statut: 'sent' },
        { ref: 'F-202602-5662', client: 'HOPITAL ELHADJI', montant: 692480, date: '2026-02-10', statut: 'paid' },
        { ref: 'F-202602-5655', client: 'HOPITAL MILITAI', montant: 4029052, date: '2026-02-09', statut: 'overdue' },
        { ref: 'F-202601-5609', client: 'CENTRE HOSPITAL', montant: 1033262, date: '2026-01-28', statut: 'paid' },
        { ref: 'F-202601-5559', client: 'CENTRE DE SANTE', montant: 404680, date: '2026-01-12', statut: 'paid' },
        { ref: 'F-202603-5701', client: 'LABORATOIRES HO', montant: 236232, date: '2026-03-01', statut: 'sent' },
        { ref: 'F-202603-5709', client: 'CLINIQUE ELITE', montant: 140060, date: '2026-03-03', statut: 'draft' },
    ],

    devis: [
        { ref: 'D-202602-0101', client: 'HOPITAL CENTRAL', montantHT: 5200000, montantTTC: 6136000, date: '2026-02-01', statut: 'sent' },
        { ref: 'D-202602-0102', client: 'CENTRE SANTE MA', montantHT: 3800000, montantTTC: 4484000, date: '2026-02-03', statut: 'sent' },
        { ref: 'D-202602-0103', client: 'CLINIQUE PASTEUR', montantHT: 8500000, montantTTC: 10030000, date: '2026-02-05', statut: 'draft' },
        { ref: 'D-202602-0104', client: 'HOPITAL ELHADJI', montantHT: 2100000, montantTTC: 2478000, date: '2026-02-07', statut: 'sent' },
        { ref: 'D-202602-0105', client: 'LABORATOIRE BIO', montantHT: 1500000, montantTTC: 1770000, date: '2026-02-10', statut: 'confirmed' },
        { ref: 'D-202602-0106', client: 'CENTRE HOSPITAL', montantHT: 6700000, montantTTC: 7906000, date: '2026-02-12', statut: 'sent' },
        { ref: 'D-202602-0107', client: 'HOPITAL MILITAI', montantHT: 4200000, montantTTC: 4956000, date: '2026-02-14', statut: 'sent' },
        { ref: 'D-202603-0108', client: 'CLINIQUE ELITE', montantHT: 3100000, montantTTC: 3658000, date: '2026-03-01', statut: 'draft' },
        { ref: 'D-202603-0109', client: 'CENTRE DE SANTE', montantHT: 5600000, montantTTC: 6608000, date: '2026-03-02', statut: 'sent' },
        { ref: 'D-202603-0110', client: 'HOPITAL REGIONAL', montantHT: 9200000, montantTTC: 10856000, date: '2026-03-03', statut: 'sent' },
        { ref: 'D-202603-0111', client: 'PHARMACIE CENTRA', montantHT: 1800000, montantTTC: 2124000, date: '2026-03-04', statut: 'draft' },
    ],

    commandes: [
        { ref: 'C-202602-0201', client: 'HOPITAL CENTRAL', montantHT: 5200000, montantTTC: 6136000, date: '2026-02-10', statut: 'confirmed' },
        { ref: 'C-202602-0202', client: 'CENTRE SANTE MA', montantHT: 3800000, montantTTC: 4484000, date: '2026-02-12', statut: 'confirmed' },
        { ref: 'C-202602-0203', client: 'LABORATOIRE BIO', montantHT: 1500000, montantTTC: 1770000, date: '2026-02-15', statut: 'pending' },
        { ref: 'C-202603-0204', client: 'CENTRE HOSPITAL', montantHT: 6700000, montantTTC: 7906000, date: '2026-03-01', statut: 'confirmed' },
        { ref: 'C-202603-0205', client: 'HOPITAL ELHADJI', montantHT: 2100000, montantTTC: 2478000, date: '2026-03-03', statut: 'pending' },
    ],

    achats: [
        { ref: 'BC-202601-0301', fournisseur: 'PHARMA DISTRIB', montantHT: 12000000, montantTTC: 14160000, date: '2026-01-10', statut: 'confirmed', type: 'bons-commande' },
        { ref: 'BC-202601-0302', fournisseur: 'MEDICORP INTL', montantHT: 8500000, montantTTC: 10030000, date: '2026-01-15', statut: 'confirmed', type: 'bons-commande' },
        { ref: 'BC-202602-0303', fournisseur: 'BIO SUPPLIES', montantHT: 4200000, montantTTC: 4956000, date: '2026-02-01', statut: 'pending', type: 'bons-commande' },
        { ref: 'DP-202602-0401', fournisseur: 'EQUIP MEDICAL', montantHT: 6800000, montantTTC: 8024000, date: '2026-02-05', statut: 'sent', type: 'demandes-prix' },
        { ref: 'DP-202602-0402', fournisseur: 'PHARMA GLOBAL', montantHT: 3500000, montantTTC: 4130000, date: '2026-02-08', statut: 'draft', type: 'demandes-prix' },
        { ref: 'FA-202601-0501', fournisseur: 'PHARMA DISTRIB', montantHT: 12000000, montantTTC: 14160000, date: '2026-01-25', statut: 'paid', type: 'factures-achats' },
        { ref: 'FA-202602-0502', fournisseur: 'MEDICORP INTL', montantHT: 8500000, montantTTC: 10030000, date: '2026-02-20', statut: 'pending', type: 'factures-achats' },
    ],

    produits: [
        { ref: 'PRD-001', nom: 'Amoxicilline 500mg', categorie: 'Antibiotiques', quantite: 2500, prixUnitaire: 1500, seuilAlerte: 500 },
        { ref: 'PRD-002', nom: 'Paracetamol 1000mg', categorie: 'Analgesiques', quantite: 5000, prixUnitaire: 800, seuilAlerte: 1000 },
        { ref: 'PRD-003', nom: 'Ibuprofene 400mg', categorie: 'Anti-inflammatoires', quantite: 3200, prixUnitaire: 1200, seuilAlerte: 800 },
        { ref: 'PRD-004', nom: 'Metformine 850mg', categorie: 'Antidiabetiques', quantite: 1800, prixUnitaire: 2500, seuilAlerte: 400 },
        { ref: 'PRD-005', nom: 'Omeprazole 20mg', categorie: 'Gastro', quantite: 4200, prixUnitaire: 1800, seuilAlerte: 600 },
        { ref: 'PRD-006', nom: 'Amlodipine 5mg', categorie: 'Cardiovasculaires', quantite: 2100, prixUnitaire: 2200, seuilAlerte: 500 },
        { ref: 'PRD-007', nom: 'Ceftriaxone 1g', categorie: 'Antibiotiques', quantite: 350, prixUnitaire: 5500, seuilAlerte: 200 },
        { ref: 'PRD-008', nom: 'Diclofenac 75mg', categorie: 'Anti-inflammatoires', quantite: 2800, prixUnitaire: 950, seuilAlerte: 700 },
        { ref: 'PRD-009', nom: 'Atorvastatine 20mg', categorie: 'Cardiovasculaires', quantite: 1500, prixUnitaire: 3200, seuilAlerte: 300 },
        { ref: 'PRD-010', nom: 'Ciprofloxacine 500mg', categorie: 'Antibiotiques', quantite: 1200, prixUnitaire: 2800, seuilAlerte: 400 },
        { ref: 'PRD-011', nom: 'Seringues 5ml', categorie: 'Consommables', quantite: 10000, prixUnitaire: 150, seuilAlerte: 2000 },
        { ref: 'PRD-012', nom: 'Gants latex M', categorie: 'Consommables', quantite: 8000, prixUnitaire: 50, seuilAlerte: 1500 },
    ],

    crm: [
        { id: 1, nom: 'Dr. Amadou Diallo', entreprise: 'Clinique Esperance', montant: 8500000, stage: 'prospect', date: '2026-02-10' },
        { id: 2, nom: 'Dr. Fatou Sow', entreprise: 'Hopital Saint Jean', montant: 12000000, stage: 'qualification', date: '2026-02-12' },
        { id: 3, nom: 'Dr. Moussa Keita', entreprise: 'Centre Medical Plus', montant: 5200000, stage: 'proposition', date: '2026-02-08' },
        { id: 4, nom: 'Dr. Aminata Ba', entreprise: 'Pharmacie Centrale', montant: 3800000, stage: 'negociation', date: '2026-02-15' },
        { id: 5, nom: 'Dr. Ibrahim Toure', entreprise: 'Labo National', montant: 15000000, stage: 'gagne', date: '2026-01-20' },
        { id: 6, nom: 'Dr. Ousmane Ndiaye', entreprise: 'Hopital Regional', montant: 7200000, stage: 'prospect', date: '2026-03-01' },
        { id: 7, nom: 'Dr. Mariama Camara', entreprise: 'Clinique du Plateau', montant: 9800000, stage: 'qualification', date: '2026-03-02' },
        { id: 8, nom: 'Dr. Sekou Barry', entreprise: 'Centre de Sante', montant: 4500000, stage: 'proposition', date: '2026-03-03' },
    ],

    employes: [
        { matricule: 'EMP-001', nom: 'Diallo Amadou', poste: 'Directeur General', departement: 'Direction', dateEmbauche: '2018-01-15', statut: 'active', salaire: 3500000 },
        { matricule: 'EMP-002', nom: 'Sow Fatima', poste: 'Directrice Commerciale', departement: 'Commercial', dateEmbauche: '2019-03-01', statut: 'active', salaire: 2800000 },
        { matricule: 'EMP-003', nom: 'Keita Moussa', poste: 'Responsable Stock', departement: 'Logistique', dateEmbauche: '2019-06-15', statut: 'active', salaire: 1800000 },
        { matricule: 'EMP-004', nom: 'Ba Aminata', poste: 'Comptable', departement: 'Finance', dateEmbauche: '2020-01-10', statut: 'active', salaire: 2200000 },
        { matricule: 'EMP-005', nom: 'Toure Ibrahim', poste: 'Commercial', departement: 'Commercial', dateEmbauche: '2020-05-20', statut: 'active', salaire: 1500000 },
        { matricule: 'EMP-006', nom: 'Ndiaye Ousmane', poste: 'Pharmacien', departement: 'Pharmacie', dateEmbauche: '2021-02-01', statut: 'conge', salaire: 2500000 },
        { matricule: 'EMP-007', nom: 'Camara Mariama', poste: 'Assistante', departement: 'Direction', dateEmbauche: '2021-09-15', statut: 'active', salaire: 1200000 },
        { matricule: 'EMP-008', nom: 'Barry Sekou', poste: 'Livreur', departement: 'Logistique', dateEmbauche: '2022-03-01', statut: 'active', salaire: 800000 },
    ],

    transactions: [
        { date: '2026-03-05', description: 'Encaissement facture F-202602-5675', type: 'encaissement', montant: 219800 },
        { date: '2026-03-04', description: 'Paiement fournisseur PHARMA DISTRIB', type: 'decaissement', montant: -5000000 },
        { date: '2026-03-03', description: 'Encaissement facture F-202603-5709', type: 'encaissement', montant: 140060 },
        { date: '2026-03-02', description: 'Charges sociales Fevrier', type: 'decaissement', montant: -3200000 },
        { date: '2026-03-01', description: 'Encaissement facture F-202603-5701', type: 'encaissement', montant: 236232 },
        { date: '2026-02-28', description: 'Salaires Fevrier', type: 'decaissement', montant: -16300000 },
        { date: '2026-02-27', description: 'Encaissement multiple clients', type: 'encaissement', montant: 8500000 },
        { date: '2026-02-25', description: 'Paiement MEDICORP INTL', type: 'decaissement', montant: -10030000 },
        { date: '2026-02-20', description: 'Encaissement facture F-202602-5662', type: 'encaissement', montant: 692480 },
    ],

    ecritures: [
        { date: '2026-03-05', piece: 'JV-0301', compte: '411000', libelle: 'Client LABORATOIRE BIO', debit: 219800, credit: 0 },
        { date: '2026-03-05', piece: 'JV-0301', compte: '701000', libelle: 'Vente de marchandises', debit: 0, credit: 186271 },
        { date: '2026-03-05', piece: 'JV-0301', compte: '445710', libelle: 'TVA collectee', debit: 0, credit: 33529 },
        { date: '2026-03-04', piece: 'JA-0302', compte: '401000', libelle: 'Fournisseur PHARMA DISTRIB', debit: 5000000, credit: 0 },
        { date: '2026-03-04', piece: 'JA-0302', compte: '512000', libelle: 'Banque', debit: 0, credit: 5000000 },
        { date: '2026-03-01', piece: 'JV-0303', compte: '411000', libelle: 'Client divers', debit: 8500000, credit: 0 },
        { date: '2026-03-01', piece: 'JV-0303', compte: '701000', libelle: 'Vente de marchandises', debit: 0, credit: 7203390 },
        { date: '2026-03-01', piece: 'JV-0303', compte: '445710', libelle: 'TVA collectee', debit: 0, credit: 1296610 },
    ],

    collaborateurs: [
        { nom: 'Amadou Diallo', role: 'Directeur General', email: 'a.diallo@prodigepharma.com', initiales: 'AD' },
        { nom: 'Fatima Sow', role: 'Directrice Commerciale', email: 'f.sow@prodigepharma.com', initiales: 'FS' },
        { nom: 'Moussa Keita', role: 'Responsable Stock', email: 'm.keita@prodigepharma.com', initiales: 'MK' },
        { nom: 'Aminata Ba', role: 'Comptable', email: 'a.ba@prodigepharma.com', initiales: 'AB' },
        { nom: 'Ibrahim Toure', role: 'Commercial Senior', email: 'i.toure@prodigepharma.com', initiales: 'IT' },
        { nom: 'Ousmane Ndiaye', role: 'Pharmacien', email: 'o.ndiaye@prodigepharma.com', initiales: 'ON' },
    ],

    quarterData: {
        1: { ca: 129803140, values: [129803140, 154662609, 105642026, 49020583, 56018487] },
        2: { ca: 98500000, values: [98500000, 112340000, 78200000, 34140000, 20300000] },
        3: { ca: 115200000, values: [115200000, 128900000, 92100000, 36800000, 23100000] },
        4: { ca: 142600000, values: [142600000, 168200000, 118500000, 49700000, 24100000] },
    },
};
