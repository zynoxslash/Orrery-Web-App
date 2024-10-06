export const scripts = {
  earth: {
    players: {
      astroneer: {
        name: 'Alper',
        sprite: '/games/astronot.png',
      },
      alien: {
        name: '???',
        sprite: '/games/alien.png',
      },
    },
    conservetaion: [
      {
        image: '/games/space-roket.jfif',
        talks: 'bg',
        speeched: `
Yıl 2026.
        `,
      },
      {
        talks: 'bg',
        speeched: `
Astronot Alper, insanlığın ilk Mars kolonisi için seçilen en cesur astronotlardandır.
`,
      },
      {
        talks: 'bg',
        speeched: `
Görevi, Mars yüzeyine inip araştırma yapmak ve gelecekteki Mars yerleşimi için kritik bilgiler toplamaktır. Ancak, Mars’a vardığında karşılaştığı şeyler tahmin ettiğinden çok daha karmaşıktır.        `,
      },
      {
        talks: 'bg',
        speeched: `
Alper, Mars atmosferine başarılı bir iniş yapar. Ancak yüzeye ayak bastığında bir anormallik fark eder.
        `,
        effect: 'darkness',
      },
      {
        image: '/games/mars-bg.jfif',
        talks: 'bg',
        speeched: `
Araştırma için aldığı veriler, bilinmeyen bir enerji kaynağını işaret etmektedir. Alper, bu enerjinin kaynağını araştırmak üzere yola koyulur.        `,
        choices: {
          question:
            'Enerjiyi incelemek için derinlere inmeli mi yoksa koloninin olduğu yere geri dönüp ekiple mi buluşmalı?',
          choices: [
            { text: 'Yes', value: 'live' },
            { text: 'No', value: 'die' },
          ],
        },
      },
      {
        talks: 'bg',
        speeched: `
Alper, enerji kaynağını takip ederken Mars’ın derinliklerinde gizemli bir mağara keşfeder. 
        `,
      },
      {
        talks: 'bg',
        speeched: `
Mağaraya girdiğinde karşılaştığı şey ise onu şok eder: İnsansı özelliklere sahip, gelişmiş bir uzaylı türü!
        `,
      },
      {
        talks: 'bg',
        speeched: `
Uzaylılar onu dostça karşılar ve Mars’ın saklı sırlarını paylaşmak isterler.`,
        choices: {
          question:
            'Uzaylılarla dostane ilişkiler mi kurmalı yoksa onlardan uzak durup görevi tamamlamaya mı odaklanmalı?',
          choices: [
            { text: 'Yes', value: 'die' },
            { text: 'No', value: 'live' },
          ],
        },
      },
      {
        talks: 'bg',
        speeched: `
Uzaylılar, Alper'e bir uyarıda bulunur: Mars’ın derinliklerinde, onların bile kontrol edemediği, devasa bir tehlike uyanmaktadır.`,
      },
      {
        talks: 'bg',
        speeched: `
Alper bu tehditle yüzleşmek zorundadır, çünkü bu tehlike yalnızca Mars değil, Dünya için de bir felaket getirebilir.`,
        choices: {
          question:
            'Uzaylıların verdiği ekipmanla bu tehdide karşı koymaya çalışmalı mı yoksa geri dönüp Dünya’yı uyarmalı mı?',
          choices: [
            { text: 'Fight the threat.', value: 'live' },
            { text: 'Warn people on Earth.', value: 'die' },
          ],
        },
      },
      {
        talks: 'bg',
        speeched: `
Tehlike her geçen dakika yaklaşırken, Alper bir seçim yapmak zorundadır. `,
      },
      {
        talks: 'bg',
        speeched: `
Uzaylılar yardım etmeye hazırdır, ancak onların amaçları hala net değildir.
`,
      },
      {
        talks: 'bg',
        speeched: `
Alper, uzaylıların güvenilir olup olmadığını çözmek zorundadır.
`,
        choices: {
          question: 'Uzaylılara tamamen güvenmeli mi yoksa onları geride bırakıp kendi başına bir çözüm mü bulmalı?',
          choices: [
            { text: 'Trust Ailen', value: 'live' },
            { text: 'Figure it out yourself.', value: 'die' },
          ],
        },
      },
      {
        talks: 'bg',
        speeched: `
Alper, devasa tehditle yüzleşir. Bu yaratık bir tür kadim Mars yaratığıdır ve uyanması felakete yol açabilir.
`,
      },
      {
        talks: 'bg',
        speeched: `
 Bu yaratık bir tür kadim Mars yaratığıdır ve uyanması felakete yol açabilir.
 `,
      },
      {
        talks: 'bg',
        speeched: `
        Alper, son hamlesini yapmadan önce Dünya ile iletişime geçer. Ancak elindeki zaman sınırlıdır. `,
        choices: {
          question:
            'Yaratığı yok etmek için kendi hayatını mı feda etmeli yoksa herkesi bırakıp başka bir gezegene kaçmalı mıdır?',
          choices: [
            { text: 'Fight the threat.', value: 'live' },
            { text: 'Escape to another planet', value: 'die' },
          ],
        },
      },
    ],
  },
}
