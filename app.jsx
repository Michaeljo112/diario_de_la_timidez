// app.jsx — Diario de la timidez · Michael Peñafiel
const { useState, useEffect, useMemo } = React;

// ─── data: extraída del manuscrito ──────────────────────────────────────────
const FRAGMENTS = [
  {
    cls: "f1",
    date: "Capítulo I",
    place: "Quito · infancia",
    title: "El bazar de mi madre",
    body:
      "Quizá fue a los 8 que, un día en el bazar de mi madre, la criada adolescente me " +
      "aseguró que era un niño guapo y yo me negué rotunda y sinceramente a aceptarlo como " +
      "verdad. Ese niño no era capaz de aceptar ese cumplido sin regañadientes, y quizá solo " +
      "empecé a creerlo de poco a poco, cuando en la adolescencia me coqueteaban las " +
      "jovencitas.",
    foot: "—la timidez se aprende temprano",
  },
  {
    cls: "f2",
    date: "21 dic, 2021",
    place: "Capítulo VI",
    title: "Me rompieron en la niñez",
    body:
      "Me hice daño mucho tiempo. Muchos años. Y ese daño era consecuencia del daño que me " +
      "hicieron de niño. Me rompieron en la niñez. Y recomponerse es un largo proceso de años. " +
      "Tarde o temprano ya no necesitas algunas piezas que perdiste. Pegas lo que puedes, " +
      "hasta que te das cuenta de que no necesitas esos pequeños pedazos; puedes ser hecho de " +
      "nuevo.",
  },
  {
    cls: "f3",
    date: "2 feb, 2022",
    place: "Aluvión de La Gasca · Quito",
    title: "Voluntariado",
    body:
      "En el voluntariado, una mujer con la que entablamos una amistad dijo: «No importa todo " +
      "lo que hagamos, nunca será suficiente», y compartí su punto de vista. Apreté la imagen " +
      "de los voluntarios en mi memoria, intentando que formara parte de mi filosofía personal " +
      "de la vida: sin ansias de gloria, sin la adición de las fotos y los halagos.",
  },
  {
    cls: "f4",
    date: "17 jul, 2022",
    place: "Capítulo XIIII · Preludio",
    title: "El amor me ha golpeado la puerta",
    body:
      "Yo que he sido por muchos años una especie de tortuga que se esconde en su caparazón, " +
      "he estado luchando por años contra una voz interior que me repite que la felicidad no " +
      "es asunto mío. El amor me ha golpeado la puerta, y le he abierto. Lo he recibido. Lo " +
      "cuidaré y lo atesoraré.",
    foot: "—ya no soy una tortuga",
  },
  {
    cls: "f5",
    date: "Capítulo X",
    place: "una cabaña en el campo, con Leisa",
    title: "Intimidad",
    body:
      "Era intimidad lo que teníamos, intimidad ordinaria, aburrida, típica, común: INTIMIDAD, " +
      "bella intimidad. La intimidad que tienen dos personas que hacen cosas que no son fuera " +
      "de lo común, pero las une de una manera más trascendental que la euforia de los viajes " +
      "emocionantes. No pude evitar pensar que la amaba sincera, franca, realista y " +
      "auténticamente.",
  },
];

const TEMAS = [
  { n: "I",    name: "La timidez",            tag: "umbral",       desc: "«La timidez es un asunto incomprendido para el que la sufre.» El miedo a hablar, a saludar, a presentarse. El tren que parte mientras uno mira desde el andén." },
  { n: "II",   name: "El ego",                tag: "coraza",       desc: "El orgullo masculino como abrigo. Rastrear sus raíces es incómodo y doloroso: en el caso de Joseph, miedo al abandono." },
  { n: "III",  name: "El deseo",              tag: "fuego",        desc: "Conquistas, fiestas, gimnasios. El deseo como motor y como anestesia. Cómo desear sin reducir al otro a un trofeo." },
  { n: "IV",   name: "La validación física",  tag: "espejo",       desc: "«Ser buen mozo me complace más que ser inteligente», admite con honestidad incómoda. El cuerpo como confesionario." },
  { n: "V",    name: "El miedo al abandono",  tag: "fuga",         desc: "Las huidas anticipadas. Irse para que no se vayan. El cinismo como estrategia íntima." },
  { n: "VI",   name: "La fidelidad",          tag: "valor",        desc: "Ser engañado a los 19 por Alicia. Y, años más tarde, descubrirse cómplice de infidelidades ajenas. Una disección honesta del estigma de ser «cachudo»." },
  { n: "VII",  name: "La memoria",            tag: "cicatriz",     desc: "Vivir con las marcas. Recorrer el yo pasado como una casa cuyas puertas y ventanas ya no nos gustan, y salir de ella." },
  { n: "VIII", name: "El amor (Leisa)",       tag: "construcción", desc: "«Si el amor debe ser inolvidable debe estar lleno de actos, de compromisos, de cuidados, de elecciones.» El amor como decisión cotidiana." },
];

const CHAPTERS = [
  { n: "I",     t: "Sobre la belleza y la duda" },
  { n: "II",    t: "Fiestas, lovukis, la noche que casi" },
  { n: "III",   t: "Interludio · el aluvión y las almejas" },
  { n: "IV",    t: "La biblioteca, el ego, María" },
  { n: "V",     t: "No siempre soy una buena persona" },
  { n: "VI",    t: "Recorrer la casa de uno mismo" },
  { n: "VII",   t: "Escuchar, callarse, escuchar" },
  { n: "VIII",  t: "La teoría del apego" },
  { n: "XIIII", t: "Preludio · el amor llama a la puerta" },
  { n: "X",     t: "Leisa, el río, la cabaña" },
  { n: "XI",   t: "César, Otello Hostel, los cachudos" },
  { n: "XII",   t: "Reformulación" },
  { n: "XIII",  t: "Un final" },
];

const LECTURAS = [
  "Hemingway", "Voltaire", "Sartre", "Frankl",
  "Umberto Eco", "Kundera", "Bradbury", "Descartes",
  "Mark Manson", "Ryan Holiday", "Joyce",
];

const RESENAS = [
  {
    quote: "Una de las voces más honestas de la nueva narrativa quiteña. Joseph confiesa lo que casi nadie se atreve a nombrar.",
    cite: "Diego Cárdenas",
    role: "Suplemento literario",
  },
  {
    quote: "Una arqueología de la masculinidad joven en Quito. Un libro que se lee con la incomodidad de mirarse por dentro.",
    cite: "Andrea Vélez",
    role: "Letras Andinas",
  },
  {
    quote: "Un diario íntimo y filosófico a la vez. Se aleja del cinismo de moda para preguntarse, en serio, qué significa amar.",
    cite: "Revista Pliego",
    role: "Reseña",
  },
];

// ─── components ─────────────────────────────────────────────────────────────
function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <div className="nav-mark">Diario de la timidez<sup>2025</sup></div>
        <nav className="nav-links">
          <a href="#sinopsis">Sinopsis</a>
          <a href="#fragmentos">Fragmentos</a>
          <a href="#indice">Índice</a>
          <a href="#temas">Temas</a>
          <a href="#joseph">Joseph</a>
          <a href="#autor">Autor</a>
        </nav>
        <a className="nav-cta" href="#order">Descargar →</a>
      </div>
    </header>
  );
}

function Hero({ author }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="hero-eyebrow">
            <span className="dot" />
            <span className="meta">Novela · primera edición · Quito 2025</span>
          </div>
          <h1 className="hero-title">
            Diario<br />de la <em>timidez</em>
          </h1>
          <p className="hero-sub">
            Trece capítulos escritos como entradas de un diario. Joseph, un joven
            quiteño, intenta entender quién fue, quién es, y quién puede llegar
            a ser cuando deje de huir.
          </p>
          <div className="hero-byline">
            <span>una novela de <strong>{author}</strong></span>
            <span className="sep" />
            <span>13 capítulos · ~90 págs</span>
          </div>
        </div>

        <div className="cover-wrap">
          <div className="cover">
            <div className="cover-ribbon" />
            <div className="cover-top">
              <span>Novela · 2025</span>
              <span>I</span>
            </div>
            <div className="cover-title">
              Diario<br/>
              de la
              <span className="a">timidez</span>
            </div>
            <div className="cover-bot">
              <div className="cover-author">{author}</div>
              <div style={{fontFamily:"var(--mono)",fontSize:9.5,letterSpacing:".18em",color:"rgba(241,233,216,.5)"}}>QUITO · MMXXV</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pull() {
  return (
    <section className="pull">
      <div className="container">
        <blockquote>
          "Recorrí mi yo pasado como una casa.<br />
          No me gustaron <span className="accent">las puertas,</span><br/>
          ni las ventanas."
        </blockquote>
        <cite>— Capítulo VI</cite>
      </div>
    </section>
  );
}

function Sinopsis() {
  return (
    <section id="sinopsis" className="section">
      <div className="container sinopsis">
        <aside className="sinopsis-aside">
          <div className="section-num">I · Sobre el libro</div>
          <h2 style={{marginTop:14}}>Una <em>confesión</em><br/>en forma<br/>de diario.</h2>
        </aside>
        <div className="sinopsis-body">
          <p>
            <em>Diario de la timidez</em> es una novela introspectiva escrita en forma de
            diario personal. Sigue la evolución emocional, intelectual y afectiva de
            <em> Joseph</em>, un joven quiteño que reconstruye, a través de reflexiones
            fragmentarias y confesiones íntimas, su tránsito desde una adolescencia marcada
            por la timidez, la inseguridad y el miedo al rechazo hacia una adultez
            atravesada por el deseo, el ego, la seducción, el amor y la búsqueda de sentido.
          </p>
          <p className="drop">
            Joseph analiza constantemente sus propias contradicciones: quiere ser admirado,
            pero desprecia la superficialidad; desea amar profundamente, aunque durante
            mucho tiempo se refugia en romances pasajeros y vínculos incompletos. La novela
            incorpora reflexiones filosóficas, psicológicas y literarias sobre el ego, la
            vulnerabilidad, la fidelidad, la memoria, la muerte y el crecimiento personal.
            Dialoga con autores clásicos y contemporáneos —Hemingway, Eco, Kundera, Frankl,
            Bradbury, Holiday— y, sobre todo, con sus propias heridas.
          </p>
          <p>
            A medida que avanzan los capítulos, el tono evoluciona desde el cinismo
            juvenil y la obsesión por la conquista hacia una visión más madura del afecto.
            La aparición de <em>Leisa</em> marca un punto de inflexión: por primera vez,
            Joseph parece dispuesto a abandonar la coraza emocional y aceptar el amor
            como una construcción consciente y cotidiana.
          </p>
          <p>
            Más que una historia lineal, la novela funciona como una exploración emocional
            del paso de la juventud a una adultez más consciente. Es un relato sobre la
            reconstrucción de uno mismo, sobre aprender a vivir con las cicatrices del
            pasado y sobre el esfuerzo de convertirse, pese al miedo, en alguien capaz
            de amar y ser amado.
          </p>
        </div>
      </div>
    </section>
  );
}

function Fragmentos() {
  return (
    <section id="fragmentos" className="section" style={{paddingTop:48}}>
      <div className="container">
        <div className="fragments-head">
          <div className="head-l">
            <div className="section-num">II · Cuaderno abierto</div>
            <h2 style={{marginTop:14}}>Cinco entradas, <span className="it">cinco</span><br/>versiones del mismo hombre.</h2>
          </div>
          <p style={{maxWidth:380,color:"var(--ink-soft)",fontStyle:"italic"}}>
            Pasajes seleccionados a lo largo del diario. La novela no avanza
            en línea recta: vuelve sobre sí misma, como toda memoria.
          </p>
        </div>

        <div className="frag-grid">
          {FRAGMENTS.map((f, i) => (
            <article key={i} className={`frag ${f.cls}`}>
              <div className="frag-head">
                <span className="frag-date">{f.date}</span>
                <span className="frag-place">{f.place}</span>
              </div>
              <h3 className="frag-title">{f.title}</h3>
              <p className="frag-body">{f.body}</p>
              {f.foot && <div className="frag-foot">{f.foot}</div>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Indice() {
  return (
    <section id="indice" className="section" style={{paddingTop:48}}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">III · Estructura</div>
            <h2 style={{marginTop:14}}>Trece <em>capítulos</em>.</h2>
          </div>
          <span className="section-kicker">Índice de la novela</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"0 64px",borderTop:"1px solid var(--rule)"}} className="indice-grid">
          {CHAPTERS.map((c,i)=>(
            <div key={i} style={{
              display:"grid",gridTemplateColumns:"56px 1fr 24px",alignItems:"baseline",gap:18,
              padding:"22px 0",borderBottom:"1px solid var(--rule)",
            }}>
              <span style={{fontFamily:"var(--mono)",fontSize:11,letterSpacing:".14em",color:"var(--accent)"}}>{c.n}</span>
              <span style={{fontFamily:"var(--display)",fontSize:22,fontStyle:"italic",color:"var(--ink)"}}>{c.t}</span>
              <span style={{fontFamily:"var(--mono)",fontSize:10.5,color:"var(--ink-mute)",letterSpacing:".14em"}}>{String(i+1).padStart(2,"0")}</span>
            </div>
          ))}
        </div>
        <style>{`@media (max-width:780px){ .indice-grid{grid-template-columns:1fr !important; gap:0 !important} }`}</style>
      </div>
    </section>
  );
}

function Temas() {
  return (
    <section id="temas" className="section">
      <div className="container temas">
        <aside>
          <div className="section-num">IV · Lo que explora</div>
          <h2 style={{marginTop:14}}>Ocho<br/><em>obsesiones</em>.</h2>
          <p style={{marginTop:24,color:"var(--ink-soft)",maxWidth:280,fontStyle:"italic"}}>
            La novela vuelve, una y otra vez, sobre las mismas preguntas. No
            las resuelve: las pone a la altura de los ojos.
          </p>
        </aside>
        <div className="tema-list">
          {TEMAS.map((t,i)=>(
            <div className="tema" key={i}>
              <div className="tema-num">{t.n}</div>
              <div>
                <div className="tema-name">{t.name}<span className="accent">{t.tag}</span></div>
              </div>
              <div className="tema-desc">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Joseph() {
  return (
    <section id="joseph" className="joseph">
      <div className="container">
        <div className="section-num" style={{color:"var(--accent-soft)"}}>V · El narrador</div>
        <h2 style={{marginTop:14}}>Quién es <em>Joseph</em>.</h2>
        <div className="joseph-grid">
          <div>
            <p>
              Joseph se describe como tímido en la adolescencia, un perdedor que
              admira y odia a la vez a los chicos populares. Con los años se vuelve,
              casi por entrenamiento, en uno de ellos: aprende los gestos, las
              palabras, la elocuencia que antes le faltaba.
            </p>
            <p>
              «Volverse un hombre atractivo —escribe— es un entrenamiento complejo.
              Uno repite y repite hasta que en la repetición encuentra naturalidad».
              Pero esa misma habilidad, la del seductor, le quema los pies. Llega un
              momento en el que el cuaderno deja de ser una bitácora de huidas para
              volverse una pregunta en voz alta: <em>¿quién quiero ser cuando deje
              de actuar?</em>
            </p>
            <p>
              Joseph lee a Hemingway en una biblioteca del centro de Quito a los 21,
              clasifica donaciones tras el aluvión de La Gasca, va al gimnasio, sale
              con amigos, conoce a María, a Brithani, a otras. Y un día, sin
              ceremonia, conoce a <em>Leisa</em>.
            </p>
          </div>
          <dl className="ficha">
            <dt>Nombre</dt><dd>Joseph</dd>
            <dt>Ciudad</dt><dd>Quito, Ecuador</dd>
            <dt>Edad en el diario</dt><dd>8 → ~28 años</dd>
            <dt>Vínculo central</dt><dd><em>Leisa</em></dd>
            <dt>Heridas declaradas</dt><dd>infancia rota · infidelidad a los 19</dd>
            <dt>Lecturas en los márgenes</dt><dd><em>{LECTURAS.join(" · ")}</em></dd>
            <dt>Lo que aprende</dt><dd><em>a quedarse</em></dd>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Resenas() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">VI · Voces</div>
            <h2 style={{marginTop:14}}>Lo que <em>se ha dicho</em>.</h2>
          </div>
          <span className="section-kicker">Adelantos de prensa · placeholders</span>
        </div>
        <div className="resena-grid">
          {RESENAS.map((r,i)=>(
            <div className="resena" key={i}>
              <div className="stars">★★★★★</div>
              <blockquote>"{r.quote}"</blockquote>
              <cite><b>{r.cite}</b>{r.role}</cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Autor({ author }) {
  return (
    <section id="autor" className="section">
      <div className="container autor">
        <div className="autor-portrait">
          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Congreso-michael-pe%C3%B1afiel.jpg?width=720"
            alt="Retrato de Michael Peñafiel"
            loading="lazy"
          />
        </div>
        <div>
          <div className="section-num">VII · Sobre el autor</div>
          <h3>{author}</h3>
          <div className="role">Econometrista · Quito, Ecuador</div>
          <p>
            Michael Peñafiel es un econometrista enfocado en estadística,
            econometría espacial, inferencia causal, análisis predictivo y
            modelización matemática. Su trabajo combina economía, matemáticas aplicadas y
            ciencia de datos para estudiar fenómenos económicos y sociales,
            especialmente aquellos relacionados con pobreza, desarrollo
            territorial y teoría monetaria.
          </p>
          <p>
            Además de su perfil académico y técnico, desarrolla proyectos
            tecnológicos y contenido educativo sobre economía, estadística y
            matemáticas aplicadas, con el objetivo de explicar ideas complejas
            de forma clara, intuitiva y aplicada.
          </p>
          <div className="qa">
            <div className="q">P · ¿Por qué un econometrista escribe un diario íntimo?</div>
            <div className="a">
              "Recorrí mi yo pasado como una casa. No me gustaron las puertas,
              ni las ventanas. Salí de ahí seguro de que no quería volver. Pero
              quería poder entrar otra vez, despacio, para entender qué había
              sido eso."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Order() {
  return (
    <section id="order" className="section">
      <div className="container">
        <div className="order-head">
          <div>
            <div className="section-num">VIII · Cómo conseguirlo</div>
            <h2 style={{marginTop:14}}>Léelo <em>gratis</em>.<br/>Si quieres, abona<br/>lo que sientas <em>justo</em>.</h2>
          </div>
          <p className="order-lede">
            El libro es de libre acceso. Puedes descargarlo sin costo o pagar lo
            que consideres que vale — cualquier apoyo ayuda a que este proyecto
            siga vivo. Elige la opción que mejor te acomode.
          </p>
        </div>

        <div className="order-grid">
          {/* Opción A — Gumroad */}
          <div className="order-card">
            <div className="order-card-head">
              <span className="order-letter">A</span>
              <div>
                <div className="order-kicker">Opción A · Descarga directa</div>
                <h3 className="order-title">Lee gratis o paga<br/>lo que quieras</h3>
              </div>
            </div>
            <p className="order-desc">
              En Gumroad puedes escribir <span className="num">0</span> para descargarlo
              sin costo, o ingresar el valor que consideres justo. El proceso toma
              menos de un minuto.
            </p>
            <dl className="order-dl">
              <div><dt>Plataforma</dt><dd>Gumroad</dd></div>
              <div><dt>Pago</dt><dd>Tarjeta · PayPal · Opcional</dd></div>
              <div><dt>Tiempo</dt><dd>&lt; 1 minuto</dd></div>
            </dl>
            <a className="btn order-btn" href="#" target="_blank" rel="noreferrer">
              Abrir en Gumroad <span className="arrow">↗</span>
            </a>
          </div>

          {/* Opción B — Pago directo */}
          <div className="order-card alt">
            <div className="order-card-head">
              <span className="order-letter">B</span>
              <div>
                <div className="order-kicker">Opción B · Pago directo</div>
                <h3 className="order-title">Transfiere o paga<br/>por PayPal</h3>
              </div>
            </div>
            <p className="order-desc">
              Si prefieres pagar directamente a Michael —desde Ecuador por
              transferencia, o desde cualquier país por PayPal— y luego recibir
              el libro.
            </p>
            <dl className="order-dl">
              <div><dt>PayPal</dt><dd className="copy"><code>@michaeljoep112</code></dd></div>
              <div><dt>Transferencia</dt><dd>Produbanco · Ecuador</dd></div>
              <div><dt>Cuenta</dt><dd className="copy"><code>20007374362</code></dd></div>
              <div><dt>Nombre</dt><dd>Michael Peñafiel</dd></div>
              <div><dt>Cédula</dt><dd className="copy"><code>1722655816</code></dd></div>
            </dl>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <a className="btn order-btn" href="https://paypal.me/michaeljoep112" target="_blank" rel="noreferrer">
                Pagar por PayPal <span className="arrow">↗</span>
              </a>
              <a className="btn btn-ghost order-btn" href="mailto:?subject=Diario%20de%20la%20timidez">
                Pedir el archivo
              </a>
            </div>
          </div>
        </div>

        <p className="order-foot">
          Gracias por leer. Si el libro te dice algo, compartirlo con alguien es,
          en sí mismo, una forma de pago.
        </p>
      </div>
    </section>
  );
}

function Footer({ author }) {
  return (
    <footer>
      <div className="container foot">
        <div className="left">Diario de la timidez · {author} · Quito MMXXV</div>
        <div className="right">
          <a href="#" style={{textDecoration:"none",color:"inherit",marginRight:24}}>Prensa</a>
          <a href="#" style={{textDecoration:"none",color:"inherit",marginRight:24}}>Contacto</a>
          <a href="#" style={{textDecoration:"none",color:"inherit"}}>Instagram</a>
        </div>
      </div>
    </footer>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "paper",
  "author": "Michael Peñafiel",
  "handnotes": true,
  "fontScale": 1.0
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.body.classList.remove("theme-paper","theme-linen","theme-ink");
    document.body.classList.add("theme-" + t.theme);
    document.body.classList.toggle("no-handnotes", !t.handnotes);
    document.documentElement.style.fontSize = (16 * t.fontScale) + "px";
  }, [t.theme, t.handnotes, t.fontScale]);

  return (
    <>
      <Nav />
      <Hero author={t.author} />
      <Pull />
      <Sinopsis />
      <Fragmentos />
      <Indice />
      <Temas />
      <Joseph />
      <Autor author={t.author} />
      <Order />
      <Footer author={t.author} />

      <TweaksPanel>
        <TweakSection label="Paleta" />
        <TweakRadio
          label="Tema"
          value={t.theme}
          options={[
            { value: "paper", label: "Papel" },
            { value: "linen", label: "Lino" },
            { value: "ink",   label: "Tinta" },
          ]}
          onChange={(v) => setTweak("theme", v)}
        />
        <TweakSection label="Detalle" />
        <TweakToggle
          label="Notas manuscritas"
          value={t.handnotes}
          onChange={(v) => setTweak("handnotes", v)}
        />
        <TweakSlider
          label="Escala tipográfica"
          value={t.fontScale}
          min={0.85} max={1.2} step={0.01}
          format={(v)=>v.toFixed(2)+"×"}
          onChange={(v) => setTweak("fontScale", v)}
        />
        <TweakSection label="Texto" />
        <TweakText
          label="Nombre del autor"
          value={t.author}
          onChange={(v) => setTweak("author", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
