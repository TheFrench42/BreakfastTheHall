/* Menu strings include HTML entities to preserve accents while keeping ASCII. */
window.MENU_DATA = {
  "order": [
    "breakfast",
    "room-service",
    "night"
  ],
  "ui": {
    "it": {
      "languageLabel": "Seleziona la lingua / Select Language",
      "home": {
        "eyebrow": "The Haven",
        "title": "Benvenuti a The Haven",
        "subtitle": "Menu e servizi in base all'orario corrente.",
        "availableNow": "Disponibile adesso",
        "closed": "Fuori orario"
      },
      "menu": {
        "eyebrow": "Menu",
        "back": "Torna alla home",
        "hours": "Orari",
        "service": "Servizio",
        "notFound": "Menu non trovato."
      }
    },
    "en": {
      "languageLabel": "Select language / Seleziona la lingua",
      "home": {
        "eyebrow": "The Haven",
        "title": "Welcome to The Haven",
        "subtitle": "Menus and services based on the current time.",
        "availableNow": "Available now",
        "closed": "Closed"
      },
      "menu": {
        "eyebrow": "Menu",
        "back": "Back to home",
        "hours": "Hours",
        "service": "Service",
        "notFound": "Menu not found."
      }
    }
  },
  "menus": {
    "breakfast": {
      "label": {
        "it": "Colazione",
        "en": "Breakfast"
      },
      "title": {
        "it": "Colazione The Haven",
        "en": "The Haven Breakfast"
      },
      "availability": {
        "start": "07:00",
        "end": "10:30"
      },
      "hero": "assets/images/banner_Colazione.jpg",
      "sections": [
        {
          "title": {
            "it": "Colazione Inclusa",
            "en": "Included Breakfast"
          },
          "items": [
            {
              "name": {
                "it": "Croissant Fragranti",
                "en": "Fresh Croissants"
              },
              "subitems": []
            },
            {
              "name": {
                "it": "Il nostro iconico Tiramis&ugrave;",
                "en": "Our iconic Tiramisu"
              },
              "subitems": []
            },
            {
              "name": {
                "it": "Pane artigianale realizzato con Farine Biologiche",
                "en": "Artisanal Bread made with Organic Flours"
              },
              "subitems": []
            },
            {
              "name": {
                "it": "Marmellata realizzata in casa",
                "en": "Homemade Jam"
              },
              "subitems": []
            },
            {
              "name": {
                "it": "Burro della Normandia",
                "en": "Normandy Butter"
              },
              "subitems": []
            },
            {
              "name": {
                "it": "Crema Pasticcera e Crema al Cioccolato",
                "en": "Cream Custard and Chocolate Cream"
              },
              "subitems": []
            },
            {
              "name": {
                "it": "Macedonia",
                "en": "Fruit Salad"
              },
              "subitems": []
            },
            {
              "name": {
                "it": "Finocchiona IGP servita con la Berkel",
                "en": "Finocchiona IGP served with Berkel"
              },
              "subitems": []
            },
            {
              "name": {
                "it": "Pantomate con Olio extravergine d'Oliva",
                "en": "Pantomate with Extra Virgin Olive Oil"
              },
              "subitems": []
            },
            {
              "name": {
                "it": "Un piatto caldo a scelta:",
                "en": "A hot dish of your choice:"
              },
              "subitems": [
                {
                  "name": {
                    "it": "Uova (come preferisci) con pane tostato e fagioli al pomodoro",
                    "en": "Eggs (as you like) with toast and tomato beans"
                  }
                },
                {
                  "name": {
                    "it": "Pancakes con sciroppo d'acero",
                    "en": "Pancakes with Maple Syrup"
                  }
                }
              ]
            }
          ]
        },
        {
          "title": {
            "it": "Aggiunte su Richiesta",
            "en": "Extras on Request"
          },
          "items": [
            {
              "name": {
                "it": "Uova Strapazzate",
                "en": "Scrambled Eggs"
              },
              "price": "10",
              "subitems": []
            },
            {
              "name": {
                "it": "Uova Fritte",
                "en": "Fried Eggs"
              },
              "price": "10",
              "subitems": []
            },
            {
              "name": {
                "it": "Uova Poch&eacute;",
                "en": "Poached Eggs"
              },
              "price": "10",
              "subitems": []
            },
            {
              "name": {
                "it": "Uova Bollite",
                "en": "Boiled Eggs"
              },
              "price": "8",
              "subitems": []
            },
            {
              "name": {
                "it": "Tagliere di Salumi",
                "en": "Charcuterie Board"
              },
              "price": "15",
              "subitems": []
            },
            {
              "name": {
                "it": "Pancakes",
                "en": "Pancakes"
              },
              "price": "8",
              "subitems": []
            },
            {
              "name": {
                "it": "Croissant",
                "en": "Croissant"
              },
              "price": "3.50",
              "subitems": []
            },
            {
              "name": {
                "it": "Tiramis\u00f9",
                "en": "Tiramis\u00f9"
              },
              "price": "3",
              "subitems": []
            },
            {
              "name": {
                "it": "Yogurt",
                "en": "Yogurt"
              },
              "price": "6",
              "subitems": []
            },
            {
              "name": {
                "it": "Tagliata di Frutta",
                "en": "Fresh Fruit Platter"
              },
              "price": "10",
              "subitems": []
            }
          ]
        },
        {
          "title": {
            "it": "Caffetteria e Bevande",
            "en": "Coffee and Beverages"
          },
          "items": [
            {
              "name": {
                "it": "Caff&egrave;",
                "en": "Espresso"
              },
              "price": "3",
              "subitems": []
            },
            {
              "name": {
                "it": "Cappuccino",
                "en": "Cappuccino"
              },
              "price": "4",
              "subitems": []
            },
            {
              "name": {
                "it": "Caff&egrave; Doppio",
                "en": "Double Espresso"
              },
              "price": "4",
              "subitems": []
            },
            {
              "name": {
                "it": "Americano",
                "en": "Americano"
              },
              "price": "4",
              "subitems": []
            },
            {
              "name": {
                "it": "Caff&egrave; Latte",
                "en": "Caff&egrave; Latte"
              },
              "price": "4",
              "subitems": []
            },
            {
              "name": {
                "it": "Cioccolata Calda",
                "en": "Hot Chocolate"
              },
              "price": "4",
              "subitems": []
            },
            {
              "name": {
                "it": "Selezione di T&egrave;",
                "en": "Selection of Teas"
              },
              "price": "4",
              "subitems": []
            },
            {
              "name": {
                "it": "Spremuta d'Arancia",
                "en": "Fresh Orange Juice"
              },
              "price": "5",
              "subitems": []
            },
            {
              "name": {
                "it": "Succhi: Pesca, Ananas, Arancia",
                "en": "Juices: Peach, Pineapple, Orange"
              },
              "price": "5",
              "subitems": []
            }
          ]
        }
      ],
      "note": {
        "it": "",
        "en": ""
      }
    },
    "room-service": {
      "label": {
        "it": "Room Service",
        "en": "Room Service"
      },
      "title": {
        "it": "Room Service Menu",
        "en": "Room Service Menu"
      },
      "availability": {
        "start": "10:30",
        "end": "23:00"
      },
      "hero": "assets/images/banner_Room_Service.jpg",
      "note": {
        "it": "Il room service include una maggiorazione del 15%.",
        "en": "Room service includes a 15% surcharge."
      },
      "sections": [
        {
          "title": {
            "it": "Antipasti",
            "en": "Starters"
          },
          "items": [
            {
              "name": {
                "it": "Mozzarella e Prosciutto",
                "en": "Parma Ham and Mozzarella Cheese"
              },
              "price": "18",
              "subitems": []
            },
            {
              "name": {
                "it": "Pizza Margherita",
                "en": "Margherita Pizza"
              },
              "price": "14",
              "subitems": []
            },
            {
              "name": {
                "it": "Misticanza",
                "en": "Mixed Salad"
              },
              "price": "14",
              "subitems": []
            },
            {
              "name": {
                "it": "Tramezzino Tonno e Pomodoro",
                "en": "Tuna and Tomato Sandwich"
              },
              "price": "12",
              "subitems": []
            },
            {
              "name": {
                "it": "Tramezzino Tacchino, Pomodoro e Senape",
                "en": "Turkey, Tomato, and Mustard Sandwich"
              },
              "price": "12",
              "subitems": []
            },
            {
              "name": {
                "it": "Insalata Caprese",
                "en": "Caprese Salad"
              },
              "price": "14",
              "subitems": []
            },
            {
              "name": {
                "it": "Selezione di Formaggi",
                "en": "Cheese Selection"
              },
              "price": "16",
              "subitems": []
            },
            {
              "name": {
                "it": "Selezione di Salumi",
                "en": "Cured Meat Selection"
              },
              "price": "18",
              "subitems": []
            },
            {
              "name": {
                "it": "Toast Prosciutto di Praga e Formaggio",
                "en": "Praga Ham and Cheese Toast"
              },
              "price": "16",
              "subitems": []
            }
          ]
        },
        {
          "title": {
            "it": "Primi Piatti",
            "en": "Pasta Course"
          },
          "items": [
            {
              "name": {
                "it": "Pasta Fresca con Ragout alla Bolognese",
                "en": "Fresh Pasta Bolognese Ragout"
              },
              "price": "20",
              "subitems": []
            },
            {
              "name": {
                "it": "Pasta Fresca al Pomodoro e Basilico",
                "en": "Fresh Pasta with Tomato and Basil"
              },
              "price": "20",
              "subitems": []
            },
            {
              "name": {
                "it": "Zuppa del giorno",
                "en": "Soup of the Day"
              },
              "price": "20",
              "subitems": []
            },
            {
              "name": {
                "it": "Gnocchi con Sugo di Coda alla Vaccinara",
                "en": "Gnocchi with Oxtail Sauce"
              },
              "price": "20",
              "subitems": []
            },
            {
              "name": {
                "it": "Ravioli, Mascarpone, Anatra, Vino Rosso",
                "en": "Ravioli with Mascarpone, Duck, and Red Wine"
              },
              "price": "26",
              "subitems": []
            }
          ]
        },
        {
          "title": {
            "it": "Secondi Piatti",
            "en": "Main Course"
          },
          "items": [
            {
              "name": {
                "it": "Tagliata di Pollo Biologico con Contorno del Giorno",
                "en": "Grilled Organic Chicken with Side of the Day"
              },
              "price": "28",
              "subitems": []
            },
            {
              "name": {
                "it": "Hamburger di Manzo Fassona",
                "en": "Beef Fassona Burger"
              },
              "price": "22",
              "subitems": []
            },
            {
              "name": {
                "it": "Pescato del giorno alla Griglia",
                "en": "Grilled Fish of the Day"
              },
              "price": "28",
              "subitems": []
            },
            {
              "name": {
                "it": "Parmigiana di Melanzane",
                "en": "Eggplant Parmigiana"
              },
              "price": "18",
              "subitems": []
            },
            {
              "name": {
                "it": "Patate Fritte",
                "en": "French Fries"
              },
              "price": "10",
              "subitems": []
            },
            {
              "name": {
                "it": "Verdure alla Griglia con Olio al Prezzemolo",
                "en": "Grilled Vegetables with Parsley Oil"
              },
              "price": "18",
              "subitems": []
            }
          ]
        },
        {
          "title": {
            "it": "Dolci",
            "en": "Desserts"
          },
          "items": [
            {
              "name": {
                "it": "Tagliata di Frutta",
                "en": "Fresh Fruit Salad"
              },
              "price": "18",
              "subitems": []
            },
            {
              "name": {
                "it": "Maritozz'Oro Panna e Cioccolato",
                "en": "Maritozz'Oro with Cream and Chocolate"
              },
              "price": "14",
              "subitems": []
            },
            {
              "name": {
                "it": "Tiramis&ugrave; in Tazza",
                "en": "Cup of Tiramis&ugrave;"
              },
              "price": "18",
              "subitems": []
            }
          ]
        }
      ]
    },
    "night": {
      "label": {
        "it": "Room Service Notturno",
        "en": "Night Room Service"
      },
      "title": {
        "it": "Room Service Notturno",
        "en": "Night Room Service"
      },
      "availability": {
        "start": "23:00",
        "end": "07:00"
      },
      "hero": "assets/images/banner_Notturno.jpg",
      "sections": [
        {
          "title": {
            "it": "",
            "en": ""
          },
          "items": [
            {
              "name": {
                "it": "Trofie al Pesto",
                "en": "Pasta \"Trofie\" with Pesto"
              },
              "price": "20",
              "subitems": []
            },
            {
              "name": {
                "it": "Lasagna",
                "en": "Lasagna"
              },
              "price": "20",
              "subitems": []
            },
            {
              "name": {
                "it": "Parmigiana di Melanzana",
                "en": "Parmigiana Eggplant"
              },
              "price": "20",
              "subitems": []
            },
            {
              "name": {
                "it": "Zuppa",
                "en": "Soup"
              },
              "price": "20",
              "subitems": []
            }
          ]
        }
      ],
      "note": {
        "it": "",
        "en": ""
      }
    }
  }
};
