========
Relances
========

Le système de relances automatise le suivi des factures impayées
et vous aide à récupérer vos créances plus efficacement.

Niveaux de relance
==================

Configurez plusieurs niveaux de relance progressifs :

.. list-table::
   :header-rows: 1
   :widths: 20 20 60

   * - Niveau
     - Délai
     - Action
   * - 1
     - J+7 après échéance
     - Email de rappel courtois
   * - 2
     - J+15
     - Email de relance ferme
   * - 3
     - J+30
     - Email de mise en demeure + courrier
   * - 4
     - J+45
     - Blocage du compte client

Configurer les relances
=======================

1. Allez dans :menuselection:`Configuration --> Relances`
2. Définissez les **niveaux de relance**
3. Personnalisez les **modèles d'email** pour chaque niveau
4. Activez ou désactivez l'**envoi automatique**

Exécuter les relances
=====================

Relances automatiques
---------------------

Si l'envoi automatique est activé, le système envoie les relances
selon le planning configuré, sans intervention manuelle.

Relances manuelles
------------------

1. Allez dans :menuselection:`Finance --> Relances`
2. Consultez la liste des factures en retard
3. Sélectionnez les clients à relancer
4. Cliquez sur **Envoyer les relances**

Suivi des relances
==================

Pour chaque client, le système conserve l'historique :

- Date et niveau de chaque relance envoyée
- Réponse ou action du client
- Montant restant dû
- Nombre de jours de retard
