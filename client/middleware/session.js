/* restreint l'acces d'une route aux utilisateurs authentifiés si la route
   ne comporte pas le meta `public` à vrai */
export default function({ store, route, redirect }) {
  if(!(route.meta.reduce((acc, cur) => acc && cur.public, true) || store.state.authUser)) {
    redirect('/');
  }
};
