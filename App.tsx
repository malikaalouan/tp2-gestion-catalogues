import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Produit = {
  id: number;
  nom: string;
  categorie: string;
  prix: number;
  stock: number;
};

const produits: Produit[] = [
  { id: 1, nom: 'Clavier', categorie: 'Accessoires', prix: 120, stock: 5 },
  { id: 2, nom: 'Souris', categorie: 'Accessoires', prix: 80, stock: 8 },
  { id: 3, nom: 'Écran', categorie: 'Informatique', prix: 900, stock: 0 },
  { id: 4, nom: 'Casque', categorie: 'Accessoires', prix: 240, stock: 3 },
];

const produitsDisponibles = produits.filter((produit) => produit.stock > 0);
const valeurTotaleStock = produits.reduce(
  (total, produit) => total + produit.prix * produit.stock,
  0,
);
const produitsMoinsChers = produits
  .filter((produit) => produit.prix < 100)
  .map((produit) => produit.nom);

const estValide = (produit: Produit) => produit.prix > 0 && produit.stock >= 0;

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Catalogue</Text>
        <Text style={styles.subtitle}>Gestion des produits</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Produits</Text>
            <Text style={styles.statValue}>{produits.length}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Disponibles</Text>
            <Text style={styles.statValue}>{produitsDisponibles.length}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Valeur stock</Text>
            <Text style={styles.statValue}>{valeurTotaleStock} MAD</Text>
          </View>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Résumé</Text>
          <Text style={styles.summaryText}>
            {produitsMoinsChers.length > 0
              ? `Moins chers : ${produitsMoinsChers.join(', ')}`
              : 'Aucun produit moins cher de 100 MAD'}
          </Text>
        </View>

        {produits.map((produit) => {
          const valide = estValide(produit);

          return (
            <View
              key={produit.id}
              style={[styles.productCard, !valide && styles.invalidProductCard]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.productName}>{produit.nom}</Text>
                <Text style={styles.productPrice}>{produit.prix} MAD</Text>
              </View>

              <Text style={styles.category}>{produit.categorie}</Text>

              <View style={styles.cardFooter}>
                <Text style={styles.stockLabel}>Stock</Text>
                <Text
                  style={[
                    styles.stockValue,
                    produit.stock === 0 && styles.outOfStock,
                  ]}
                >
                  {produit.stock} unité{produit.stock > 1 ? 's' : ''}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7ff',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  summaryBox: {
    backgroundColor: '#e0e7ff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#312e81',
    marginBottom: 6,
  },
  summaryText: {
    color: '#4338ca',
    fontSize: 14,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  invalidProductCard: {
    borderColor: '#fca5a5',
    backgroundColor: '#fff7f7',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb',
  },
  category: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockLabel: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },
  stockValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#16a34a',
  },
  outOfStock: {
    color: '#dc2626',
  },
});
