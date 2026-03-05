====================
Mouvements de stock
====================

Les mouvements de stock tracent toutes les entrées et sorties
de marchandises pour maintenir un inventaire à jour.

Types de mouvements
===================

Entrées de stock
-----------------

Les entrées augmentent la quantité en stock :

- **Réception fournisseur** : marchandises reçues suite à une commande d'achat
- **Retour client** : produits retournés par un client
- **Ajustement positif** : correction manuelle après inventaire

Sorties de stock
-----------------

Les sorties diminuent la quantité en stock :

- **Livraison client** : marchandises expédiées au client
- **Retour fournisseur** : produits renvoyés au fournisseur
- **Ajustement négatif** : correction manuelle (perte, casse, vol)

Consulter les mouvements
========================

1. Allez dans :menuselection:`Stocks --> Mouvements`
2. Filtrez par :

   - **Période** : date de début et fin
   - **Produit** : un article spécifique
   - **Type** : entrée ou sortie
   - **Origine** : commande, facture ou ajustement

Chaque mouvement affiche :

- Date du mouvement
- Produit concerné
- Quantité entrée ou sortie
- Document d'origine (commande, facture, inventaire)
- Stock résultant après mouvement

Mouvements automatiques
========================

Certains mouvements sont créés automatiquement :

- **Validation d'une commande fournisseur** → entrée de stock
- **Validation d'une facture client** (pour les produits stockables) → sortie de stock

.. note::
   Les mouvements automatiques sont liés au document d'origine
   pour assurer la traçabilité complète.
