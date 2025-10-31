'use client';

import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Search, Menu, X } from 'lucide-react';

export default function ClothingStore() {
  const [cartItems, setCartItems] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [email, setEmail] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const categories = [
    { id: 'all', name: 'Todo' },
    { id: 'shirts', name: 'Camisetas' },
    { id: 'pants', name: 'Pantalones' },
    { id: 'dresses', name: 'Vestidos' }
  ];

  const products = [
    {
      id: 1,
      name: 'Camisa Eco Premium',
      category: 'shirts',
      price: 599,
      originalPrice: 899,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      rating: 4.8,
      reviews: 124,
      sustainable: true
    },
    {
      id: 2,
      name: 'Jeans Orgánicos',
      category: 'pants',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
      rating: 4.9,
      reviews: 89,
      sustainable: true
    },
    {
      id: 3,
      name: 'Vestido Verano',
      category: 'dresses',
      price: 899,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
      rating: 4.7,
      reviews: 156,
      sustainable: false
    },
    {
      id: 4,
      name: 'Sudadera Bambú',
      category: 'shirts',
      price: 799,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
      rating: 4.6,
      reviews: 203,
      sustainable: true
    }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const addToCart = () => {
    setCartItems(prev => prev + 1);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedPrivacy) {
      alert('Debes aceptar el Aviso de Privacidad');
      return;
    }
    if (email) {
      alert('¡Gracias por suscribirte!');
      setEmail('');
      setAcceptedPrivacy(false);
      setShowPrivacyModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-xl">
                E
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">EcoStyle</h1>
                <p className="text-xs text-zinc-500">Moda Sostenible</p>
              </div>
            </div>

            {/* Search bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="input w-full pl-10"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <Heart className="h-6 w-6 text-foreground" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <ShoppingCart className="h-6 w-6 text-foreground" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {cartItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner Simple */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
              <span className="gradient-text">Moda Consciente</span>
            </h2>
            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-300">
              Ropa eco-friendly para un futuro sostenible
            </p>
            <button className="btn-primary">
              Ver Colección
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap rounded-full px-6 py-2 font-medium transition-all ${selectedCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-zinc-100 text-foreground hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="mb-8 text-2xl font-bold text-foreground">Productos</h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="card group cursor-pointer"
              >
                {/* Image */}
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.sustainable && (
                    <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-lg">
                      🌿
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 transition-all hover:scale-110"
                  >
                    <Heart
                      className={`h-5 w-5 transition-colors ${favorites.includes(product.id)
                        ? 'fill-primary text-primary'
                        : 'text-zinc-600'
                        }`}
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    {product.name}
                  </h4>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'text-zinc-300'
                          }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-zinc-600 dark:text-zinc-400">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-zinc-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={addToCart}
                      className="btn-primary px-4 py-2 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section con Aviso de Privacidad */}
      <section className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h3 className="mb-4 text-2xl font-bold text-foreground">
            Suscríbete a nuestro Newsletter
          </h3>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            Recibe ofertas exclusivas y novedades eco-friendly
          </p>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="input max-w-xs"
                required
              />
              <button type="submit" className="btn-primary">
                Suscribirme
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm">
              <input
                type="checkbox"
                id="privacy"
                checked={acceptedPrivacy}
                onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-primary focus:ring-primary"
                required
              />
              <label htmlFor="privacy" className="text-zinc-600 dark:text-zinc-400">
                Acepto el{' '}
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-primary hover:underline font-medium"
                >
                  Aviso de Privacidad
                </button>
              </label>
            </div>
          </form>
        </div>
      </section>

      {/* Modal de Aviso de Privacidad */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="card max-w-2xl max-h-[80vh] overflow-y-auto bg-card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">Aviso de Privacidad</h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <section>
                <h4 className="font-semibold text-foreground mb-2">1. Responsable del Tratamiento</h4>
                <p>
                  EcoStyle, con domicilio en Carretera Cancún-Aeropuerto, S.M 299-Km. 11.5, 77565 Q.R.
                  , es responsable del tratamiento de sus datos personales.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-2">2. Datos Personales Recabados</h4>
                <p>
                  Recopilamos su correo electrónico para enviarle información sobre nuestros productos, promociones y novedades relacionadas con moda sostenible.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-2">3. Finalidad del Tratamiento</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Envío de newsletter y promociones</li>
                  <li>Información sobre nuevos productos eco-friendly</li>
                  <li>Comunicaciones relacionadas con sostenibilidad</li>
                </ul>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-2">4. Derechos ARCO</h4>
                <p>
                  Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales.
                  Para ejercer estos derechos, contáctenos en: pechmoises@ecostyle.com
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-2">5. Transferencia de Datos</h4>
                <p>
                  No compartimos sus datos personales con terceros sin su consentimiento expreso, excepto cuando sea requerido por ley.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-2">6. Seguridad</h4>
                <p>
                  Implementamos medidas de seguridad técnicas y administrativas para proteger sus datos personales contra acceso no autorizado.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-2">7. Cookies y Tecnologías</h4>
                <p>
                  Utilizamos cookies para mejorar su experiencia de navegación. Puede configurar su navegador para rechazar cookies.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-2">8. Modificaciones</h4>
                <p>
                  Nos reservamos el derecho de actualizar este aviso de privacidad. Las modificaciones serán publicadas en nuestro sitio web.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-2">9. Contacto</h4>
                <p>
                  Para cualquier duda o aclaración sobre este aviso de privacidad, contáctenos en:<br />
                  Email: pechmoises@ecostyle.com<br />
                  
                </p>
              </section>

              <p className="text-xs mt-4 pt-4 border-t border-border">
                Última actualización: Octubre 2025
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="btn-outline"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setAcceptedPrivacy(true);
                  setShowPrivacyModal(false);
                }}
                className="btn-primary"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Simple */}
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3 text-center sm:text-left">
            <div>
              <h5 className="mb-3 font-semibold text-foreground">Sobre Nosotros</h5>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Moda sostenible comprometida con el planeta
              </p>
            </div>
            <div>
              <h5 className="mb-3 font-semibold text-foreground">Enlaces</h5>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-primary">Tienda</a></li>
                <li><a href="#" className="hover:text-primary">Contacto</a></li>
                <li>
                  <button
                    onClick={() => setShowPrivacyModal(true)}
                    className="hover:text-primary"
                  >
                    Aviso de Privacidad
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-3 font-semibold text-foreground">Síguenos</h5>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                @ecostyle
              </p>
            </div>
          </div>
          <div className="divider" />
          <p className="text-center text-sm text-zinc-500">
            © 2025 EcoStyle. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}