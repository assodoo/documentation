==========
Inventaire
==========

L'inventaire physique permet de vérifier et corriger les quantités
en stock par rapport aux données du système.

Créer un inventaire
===================

1. Allez dans :menuselection:`Stocks --> Inventaire`
2. Cliquez sur **Nouveau**
3. Choisissez le périmètre :

   - **Inventaire complet** : tous les produits stockables
   - **Inventaire partiel** : une catégorie ou une sélection de produits

4. Cliquez sur **Démarrer l'inventaire**

Saisir les quantités
====================

Pour chaque produit listé :

1. Comptez physiquement la quantité disponible
2. Saisissez la **quantité réelle** dans la colonne correspondante
3. Le système calcule automatiquement l'**écart** avec le stock théorique

.. list-table::
   :header-rows: 1
   :widths: 30 20 20 20

   * - Produit
     - Stock théorique
     - Stock réel
     - Écart
   * - Clavier USB
     - 50
     - 48
     - -2
   * - Souris sans fil
     - 30
     - 30
     - 0
   * - Écran 24 pouces
     - 15
     - 17
     - +2

Valider l'inventaire
====================

1. Vérifiez les écarts identifiés
2. Ajoutez un **commentaire** pour justifier les écarts si nécessaire
3. Cliquez sur **Valider l'inventaire**

.. important::
   La validation de l'inventaire génère automatiquement des mouvements
   d'ajustement (positifs ou négatifs) pour mettre à jour les stocks.

Historique des inventaires
==========================

Consultez l'historique de tous les inventaires réalisés :

- Date de l'inventaire
- Périmètre (complet ou partiel)
- Nombre d'écarts constatés
- Valeur des écarts
