# Esercizi React Native

## Esercizio 1.0

Sviluppare un'app per la ricerca di prodotti.

La vista deve essere composta da un campo di testo e da una lista di post.

Il campo di testo deve essere posizionato in alto e deve essere possibile inserire del testo al suo interno, al cambio del testo deve essere effettuata una ricerca dei prodotti che contengono il testo inserito nel campo di testo.

L'api per la lista è presente al seguente indirizzo: https://dummyjson.com/products
L'api per la ricerca è presente al seguente indirizzo: https://dummyjson.com/products/search?q=RICERCA

Ogni elemento della lista deve mostrare:
- immagine prodotto (`<Image />`)
- title (`<Text />`)
- description (`<Text />`)

Per sviluppare la lista puoi usare [`<FlatList />`](https://reactnative.dev/docs/flatlist).

## Come consegnare l'esercizio

- Fork del repository
- per chi ha React Native: `npx react-native@latest init Exercise1`
- per chi ha Expo: `npx create-expo-app Exercise1`
