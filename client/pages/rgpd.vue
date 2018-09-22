<template>
<div class="white-page">
  <h3>Données collectés</h3>
  <pre>
    {
      username: String,           # Pour vous identifier
      email: Encrypted_String,    # Pour vous identifier, réinitialiser un mot de passe, ou reçevoir des alertes. Chiffrement reversible
      password: Encrypted_String, # Pour vous connecté, chiffrement uni-directionnel
      rides: [                    # Le coeur du site
        {
          title: String,          # C'est pas mal un titre, pour pouvoir le retrouver ou trier par titre
          date: Date,             # Pour situer le ride dans le temps, trier par date, etc...
          relive: String,         # Un lien vers la vidéo Relive, par ce que c'est cool
          description: String,    # Au format markdown, ça fait pas de mal de pouvoir ajouter une description, non ?
          real_gpx: File,         # La trace enregistré pendant la sortie, pour pouvoir l'afficher sur une carte ou le télécharger
          track_gpx: File,        # La trace prévue pour ce ride, intéressant de comparer le réalisé du prévu
        },
        ...
      ],
      modifs: [                   # Les modifications de réglage de votre spad
        {
          title: String,          # Comme pour les rides, c'est toujours utile pour les retrouver ou les trier
          date: Date,             # Là aussi, savoir quand la modif à été faite est utile
          type: Enum,             # Le type de modif (pression des pneus, réglage de la fourche, etc...)
          description: String     # Au format markdown, pour ajouter des informations
        }
      ]
    }
  </pre>
  <p>Toutes ces données, sauf le username, l'email et le password seront transmis sans état d'âme à divers sites, comme Facebook par
  exemple lors que partagez un ride ou une modification.</p>
</div>
</template>

<script>
export default {
  meta: {
    public: true
  }
};
</script>
