/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "15px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1310px",
      },
      fontFamily: {
        // Fontes que remetam a aventura, natureza, mas mantendo boa legibilidade.
        // Pense em fontes mais robustas ou dinâmicas para títulos e algo limpo para o corpo do texto.
        primary: "var(--font-montserrat)", // Exemplo: Montserrat ou Open Sans para um visual moderno e legível
        secondary: "var(--font-rajdhani)" // Exemplo: Rajdhani ou outra fonte mais 'sporty' para destaques
      },
      colors: {
        // Paleta de cores inspirada na natureza e energia dos esportes radicais.
        // Pense em tons de verde, azul, terra e cores vibrantes para acentuação.
        primary: "#F8F8F8", // Um verde musgo escuro ou azul profundo para o fundo principal
        accent: {
          DEFAULT: "#38A169", // Um verde vibrante ou laranja/vermelho terra para acentos
          hover: "#2F855A", // Tom mais escuro para o hover
        },
        secondary: {
          DEFAULT: "#0F3D3D", // Um azul-esverdeado escuro ou marrom terra
          hover: "#134F4F",
        },
        tertiary: {
          DEFAULT: "#5A8B5A", // Um verde mais claro ou tom de areia/pedra
          hover: "#4D7A4D",
        },
        // Novos tons que remetam mais à aventura:
        earth: "#8B4513", // Marrom terra
        sky: "#87CEEB", // Azul céu
        adventureOrange: "#FF4500", // Laranja vibrante para destaques de aventura
        grey: "#737373", // Manter o cinza neutro
      },
      backgroundImage: {
            hero_main_bg: "url(/assets/hero/herobg.png)",
 // Opacidades reduzidas para 30% e 20%

        hero_1: "url(/assets/hero/heroNatureza.jpg)",
        hero_2: "url(/assets/hero/heroRadical.jpg)",
        pattern: "url(/assets/pattern_bg.png)",
      },
//   theme: {
//   	extend: {
//   		container: {
//   			center: true,
//   			padding: '15px'
//   		},
//   		screens: {
//   			sm: '640px',
//   			md: '768px',
//   			lg: '1024px',
//   			xl: '1310px'
//   		},
//   		fontFamily: {
//   			primary: 'var(--font-poppins)',
//   			secondary: 'var(--font-caveat)'
//   		},
//   		colors: {
//   			primary: '#0f1017',
//   			accent: {
//   				DEFAULT: '#e14817',
//   				hover: '#cb4419'
//   			},
//   			secondary: {
//   				DEFAULT: '#1b1c23',
//   				hover: '#1f212d'
//   			},
//   			tertiary: {
//   				DEFAULT: '#26272e',
//   				hover: '#24252c'
//   			},
//   			grey: '#737373'
//   		},
//   		backgroundImage: {
//   			hero_1: 'url(/assets/hero/hero-bg1.png)',
//   			hero_2: 'url(/assets/hero/hero-bg2.png)',
//   			pattern: 'url(/assets/pattern_bg.png)'
//   		},

  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};


{/* theme: {
    extend: {
      container: {
        center: true,
        padding: "15px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1310px",
      },
      fontFamily: {
        // Fontes que remetam a aventura, natureza, mas mantendo boa legibilidade.
        // Pense em fontes mais robustas ou dinâmicas para títulos e algo limpo para o corpo do texto.
        primary: "var(--font-montserrat)", // Exemplo: Montserrat ou Open Sans para um visual moderno e legível
        secondary: "var(--font-rajdhani)" // Exemplo: Rajdhani ou outra fonte mais 'sporty' para destaques
      },
      colors: {
        // Paleta de cores inspirada na natureza e energia dos esportes radicais.
        // Pense em tons de verde, azul, terra e cores vibrantes para acentuação.
        primary: "#F8F8F8", // Um verde musgo escuro ou azul profundo para o fundo principal
        accent: {
          DEFAULT: "#38A169", // Um verde vibrante ou laranja/vermelho terra para acentos
          hover: "#2F855A", // Tom mais escuro para o hover
        },
        secondary: {
          DEFAULT: "#0F3D3D", // Um azul-esverdeado escuro ou marrom terra
          hover: "#134F4F",
        },
        tertiary: {
          DEFAULT: "#5A8B5A", // Um verde mais claro ou tom de areia/pedra
          hover: "#4D7A4D",
        },
        // Novos tons que remetam mais à aventura:
        earth: "#8B4513", // Marrom terra
        sky: "#87CEEB", // Azul céu
        adventureOrange: "#FF4500", // Laranja vibrante para destaques de aventura
        grey: "#737373", // Manter o cinza neutro
      },
      backgroundImage: {
            hero_main_bg: "url(/assets/hero/herobg.png)",
 // Opacidades reduzidas para 30% e 20%

        hero_1: "url(/assets/hero/heroNatureza.jpg)",
        hero_2: "url(/assets/hero/heroRadical.jpg)",
        pattern: "url(/assets/pattern_bg.png)",
      },
    },
  }, */}