---
title: Liste des tables
author: Damien Plumettaz
---

### Sorties (ride)
Contient l'ensemble des sorties effectuées.

| Champ          | Description
|----------------|---------------------------------------------------------------
| User*          | l'utilisateur ayant effectué cette sortie
| Bike*          | une réference au vélo utilisé lors de cette sortie
| Lieu           | texte libre permettant de localiser cette sortie
| Date           | la date et l'heure de cette sortie
| Titre          | un titre libre pour cette sortie
| Odo            | le kilomètrage relevé en fin de sortie
| Résumé         | un texte markdown permettant de décrire cette sortie, avec si possible des images
| Trace          | La trace gps de cette sortie
| Relive         | lien vers la vidéo relive de cette sortie


### Vélos (bike)
Identifie les différents vélos possédés.

| Champ          | Description
|----------------|---------------------------------------------------------------
| User*          | l'utilisateur auquel appartient ce vélo
| Marque*        | une référence à la marque du vélo
| Modèle         | le nom du modèle de ce vélo
| Date d'achat   | la date d'achat de ce vélo
| Date de rebut  | la date de vente ou de mise au rebut de ce vélo. Si non `null`, ce vélo sera marqué comme retiré et n'apparaitra plus dans la liste des vélos (lors de la saisie d'une sortie)
| Prix achat     | le prix auquel le vélo a été acheté
| Prix de vente  | le prix auquel le vélo a été revendu


### Modifications / Maintenance
Garde une trace de toutes les modifications qui sont apporté sur un vélo donné,
permet de garder une traces des améiorations et de la maintenace effectuée sur
le vélo afin d'estimer la durée de vie des divers composants.

| Champ          | Description
|----------------|---------------------------------------------------------------
| User*          | l'utilisateur ayant effectuée cette modification
| Bike*          | le vélo concerné par cette modification
| Article*       | une référence au type de matériel concerné
| Date           | la date de la modification ou du remplacement
| Odo            | le nombre de km total du vélo concerné, la durée de vie du composant sera estimé en fonction de la dernière modification du même type
| Prix d'achat   | le prix d''achat du composant en question
| Prix de vente  | le prix auquel le composant à pu être revendu
| Garantie       | Un scan ou lien de la preuve d'achat permettant de faire jouer la garantie


### **Type** de matériel / Emplacement
Liste les différents emplacements des composants, afin de savoir lorsque un
composant en remplace un autre.

| Champ          | Description
|----------------|---------------------------------------------------------------
| Groupe         | l''emplacement général du composant(frein avant, transmition, ...)
| Nom            | le nom général du composant


### Marques (brand)
Juste une liste des différentes marques, avec des liens vers le site principal
et une eventuelle documentation.

| Champ          | Description
|----------------|---------------------------------------------------------------
| Nom            | le nom de la marque
| Site web       | un lien vers le site principal de la marque
| Logo           | le logo de la marque, pour le fun et l'UX


### Articles
Une liste des différents composants installé sur les vélos. Correspond à une
référence en particulier d'une marque.

| Champ          | Description
|----------------|---------------------------------------------------------------
| Type*          | le type de ce composant
| Marque*        | la référence de ce composant
| Modèle         | la designation de ce composant
| référence      | le code de référence du fabricant


### utilisateurs
Contient la liste des utilisateurs enregistés sur ce site.

| Champ          | Description
|----------------|---------------------------------------------------------------
| username       | le nom de l'utilisateur
| email          | l'adresse email de l'utilisateur
| passwordHash   | le hash du password de l'utilisateur
| role           | le role de l'utilisateur, les admins pourraient avoir acces à d'autres pages
| rides*         | la liste des différents rides de cet utilisateur
| bikes*         | la liste des vélos possédés par cet utilisateur
| modifications* | la liste des modifications effectuées par cet utilisateur
