============
Numérotation
============

La numérotation définit les séquences utilisées pour identifier
de manière unique chaque document commercial.

Séquences par défaut
====================

.. list-table::
   :header-rows: 1
   :widths: 30 30 40

   * - Document
     - Format
     - Exemple
   * - Devis
     - DEV-AAAA-NNNN
     - DEV-2026-0001
   * - Factures clients
     - FAC-AAAA-NNNN
     - FAC-2026-0001
   * - Avoirs
     - AVO-AAAA-NNNN
     - AVO-2026-0001
   * - Commandes fournisseurs
     - CMD-AAAA-NNNN
     - CMD-2026-0001
   * - Factures fournisseurs
     - (numéro du fournisseur)
     - —

Personnaliser les séquences
============================

1. Allez dans :menuselection:`Configuration --> Numérotation`
2. Pour chaque type de document, définissez :

   - **Préfixe** : lettres au début (ex : FAC, INV)
   - **Séparateur** : caractère entre les parties (ex : -, /)
   - **Inclusion de l'année** : oui/non
   - **Nombre de chiffres** : longueur du compteur (ex : 4 → 0001)
   - **Prochain numéro** : valeur du compteur

Réinitialisation annuelle
==========================

Par défaut, les compteurs sont réinitialisés chaque année :

- FAC-2025-0247 (dernière facture de 2025)
- FAC-2026-0001 (première facture de 2026)

Vous pouvez désactiver cette réinitialisation pour une numérotation
continue sur plusieurs années.

.. important::
   En France, la numérotation des factures doit être **chronologique
   et continue**, sans rupture dans la séquence. Toute facture émise
   doit avoir un numéro unique et séquentiel.

.. note::
   Les numéros de factures fournisseurs ne sont pas gérés par le système :
   utilisez le numéro indiqué sur la facture reçue du fournisseur.
