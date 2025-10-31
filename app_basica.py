import requests
from bs4 import BeautifulSoup
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.carousel import Carousel
from kivy.uix.image import AsyncImage
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.core.window import Window

class OfertasApp(App):

    def obtener_ofertas(self):
        url = "https://www.lapolar.cl/tecnologia/"
        productos_final = []

        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        soup = BeautifulSoup(response.text, 'html.parser')

        elementos = soup.find_all("div", class_=lambda x: x and "product-tile__item" in x)

        for elem in elementos[:5]:  # Solo primeros 5 productos para prueba rápida
            titulo_tag = elem.find("a", class_="link")
            imagen_tag = elem.find("img", class_="tile-image")
            precio_tag = elem.find("span", class_="price-value")

            titulo = titulo_tag.get_text(strip=True) if titulo_tag else "Sin título"
            imagen = imagen_tag['src'] if imagen_tag else "https://via.placeholder.com/400x200.png"
            precio = precio_tag.get_text(strip=True) if precio_tag else "Precio no disponible"

            productos_final.append({
                "nombre": titulo,
                "precio": precio,
                "imagen": imagen
            })

        return productos_final

    def build(self):
        Window.clearcolor = (1, 1, 1, 1)

        productos = self.obtener_ofertas()

        main_layout = BoxLayout(orientation='vertical', spacing=10, padding=10)

        title = Label(text="[b]🔥 Ofertas en Tiempo Real 🔥[/b]", font_size=30, markup=True, color=(0,0,0,1), size_hint=(1,0.1))
        main_layout.add_widget(title)

        carousel = Carousel(direction='right', size_hint=(1, 0.6))

        for prod in productos:
            imagen = AsyncImage(source=prod["imagen"], allow_stretch=True)
            carousel.add_widget(imagen)

        main_layout.add_widget(carousel)

        # Barra de búsqueda (sin funcionalidad aún)
        main_layout.add_widget(TextInput(hint_text="🔍 Buscar ofertas...", size_hint=(1,0.1)))

        # Botones menú
        menu = BoxLayout(size_hint=(1, 0.1), spacing=10)
        menu.add_widget(Button(text="Particulares 🛒"))
        menu.add_widget(Button(text="Negocios 🏪"))
        main_layout.add_widget(menu)

        return main_layout

if __name__ == '__main__':
    OfertasApp().run()
