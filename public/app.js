/* ============================================================
   Mini Star Child Care — Combined App
   Design: ministar-fly (night/gold/coral/teal palette)
   Features: auth, admin/teacher/parent portals, messages
   Storage: localStorage (no server required)
   ============================================================ */

/* ---------- i18n ---------- */
let LANG = 'en';
let EDIT_CHILD_ID = null;
const I18N_ES = {
  nav_home:'Inicio',nav_about:'Nosotros',nav_programs:'Programas',nav_enrollment:'Inscripcion',nav_contact:'Contacto',nav_login:'Acceso',
  tab_home:'Inicio',tab_about:'Nosotros',tab_programs:'Programas',tab_enroll:'Inscribir',tab_contact:'Contacto',tab_login:'Acceso',
  hero_badge:'Cuidamos ninos desde recien nacidos hasta los 12 anos',
  hero_h1:'Bienvenidos a <span class="gold">Mini Star</span><br>Child Care',
  hero_tag:'Un lugar seguro, carinoso y acogedor donde cada nino puede aprender, crecer y brillar.',
  hero_enroll:'Inscribase Hoy',hero_progs:'Nuestros Programas',
  home_eyebrow:'Donde comienzan futuros brillantes',home_h2:'Cada nino es unico',
  home_p1:'En Mini Star Child Care, ofrecemos un lugar seguro, carinoso y acogedor donde cada nino puede aprender, crecer y brillar.',
  home_p2:'Nuestro objetivo es dar tranquilidad a las familias sabiendo que sus hijos estan en un ambiente de cuidado todos los dias.',
  home_lead:'Unase a la familia de Mini Star Child Care, donde comienzan futuros brillantes.',
  val_safe:'Seguro',val_loving:'Carinoso',val_learning:'Aprendizaje',val_growing:'Crecimiento',
  about_eyebrow:'Nosotros',about_h2:'Construido sobre amor, confianza, aprendizaje y apoyo familiar',
  about_p1:'Entendemos que elegir el cuidado infantil es una decision importante. Por eso estamos comprometidos a brindar un ambiente calido y hogareno.',
  about_p2:'Creemos que los ninos aprenden mejor a traves de experiencias positivas, juego significativo y relaciones de carino.',
  about_mission:'Nuestra mision es simple: cuidar a los ninos con amor mientras los ayudamos a aprender y prosperar cada dia.',
  about_btn:'Ver Nuestros Programas',
  prog_eyebrow:'Programas',prog_h2:'Cuidado para cada edad, desde recien nacidos hasta los 12 anos',
  prog_intro:'Nuestros programas estan disenados para satisfacer las necesidades de cada grupo de edad:',
  prog_infants:'Bebes',age_infants:'0-1 ano',prog_infants_p:'Cuidado tierno, confort, alimentacion y apoyo al desarrollo temprano.',
  prog_toddlers:'Ninos Pequenos',age_toddlers:'1-3 anos',prog_toddlers_p:'Juego seguro, desarrollo del lenguaje, movimiento y aprendizaje a traves de rutinas.',
  prog_pre:'Preescolares',age_pre:'3-5 anos',prog_pre_p:'Actividades de educacion temprana, creatividad y preparacion escolar.',
  prog_school:'Edad Escolar',age_school:'5-12 anos',prog_school_p:'Apoyo con tareas, actividades divertidas y cuidado despues de la escuela.',
  prog_daily:'Cada dia incluye:',
  prog_li1:'Aprendizaje apropiado para cada edad',prog_li2:'Tiempo de juego y desarrollo social',
  prog_li3:'Supervision atenta y carinosa',prog_li4:'Espacio para explorar, descubrir y crecer a su propio ritmo',
  prog_close:'Nuestro programa ayuda a los ninos a desarrollar confianza, independencia y amor por el aprendizaje.',
  prog_btn:'Pregunte por Cupos',
  en_eyebrow:'Inscripcion',en_h2:'Nos alegra dar la bienvenida a nuevas familias',
  en_p:'Si esta interesado en inscribir a su hijo, contactenos para preguntar sobre cupos y disponibilidad.',
  en_how:'Como inscribirse',en_s1b:'Contactenos',en_s1s:'Comuniquese por telefono o correo para preguntar sobre disponibilidad.',
  en_s2b:'Haga sus preguntas',en_s2s:'Estamos aqui para responder sus preguntas y hacer el proceso simple.',
  en_s3b:'Lo guiamos en los siguientes pasos',en_s3s:'Detalles de registro y todo lo que necesita para comenzar.',
  en_cta:'Para inscribirse, contactenos hoy y pregunte por disponibilidad.',en_btn:'Contactenos',
  c_eyebrow:'Contacto',c_h2:'Nos encantaria saber de usted',
  c_p:'Si tiene preguntas sobre nuestros servicios, inscripcion o cupos, comuniquese con Mini Star Child Care:',
  c_phone:'Telefono',c_email:'Correo Electronico',c_addr:'Direccion',c_hours:'Horario',c_hours_val:'Abierto 24 Horas - 7 Dias a la Semana',
  c_call:'Llamenos',c_directions:'Como Llegar',c_mail:'Escribanos',c_addr:'Direccion',c_serving:'Sirviendo a familias en SeaTac, Washington y sus alrededores.',
  footer:'Mini Star Child Care - donde comienzan futuros brillantes',
  // hero extras
  hero_tagline:'No solo guardería &mdash; un programa completo de desarrollo infantil con planes de lecciones diarios, seguimiento del progreso y reportes semanales para padres.',
  hero_pill1:'&#128197; Planes de Lección Diarios',
  hero_pill2:'&#128202; Seguimiento del Progreso',
  hero_pill3:'&#128140; Reportes Semanales para Padres',
  // impact strip
  impact_lbl1:'Áreas de Aprendizaje',impact_lbl2:'Programas por Edad',impact_lbl3:'Cuidado Disponible',impact_lbl4:'Años Atendidos',
  // More Than Childcare
  mtc_eyebrow:'&#9733; Un programa de desarrollo completo',
  mtc_h2:'Más Que Guardería &mdash;<br>Un Programa Completo de Desarrollo Infantil',
  mtc_p:'Cada hora en Mini Star es intencional y con propósito. Su hijo nunca está simplemente esperando &mdash; está aprendiendo activamente y desarrollando habilidades reales cada día.',
  mtc1_b:'Currículo Diario',mtc1_s:'Planes de lecciones estructurados para cada grupo de edad, todos los días &mdash; no solo juego libre todo el día',
  mtc2_b:'Seguimiento del Progreso',mtc2_s:'El desarrollo de cada niño monitoreado en 10 áreas y documentado con notas',
  mtc3_b:'Reportes para Padres',mtc3_s:'Resúmenes semanales de aprendizaje enviados directamente a usted &mdash; sepa exactamente lo que hizo su hijo',
  mtc4_b:'Preparación Escolar',mtc4_s:'Niños evaluados y preparados para el kínder y más allá en todas las áreas clave',
  mtc5_b:'Preparación para la Vida',mtc5_s:'Autocuidado práctico, responsabilidad y habilidades emocionales integradas en la rutina diaria',
  mtc6_b:'Aprendizaje Basado en Proyectos',mtc6_s:'Mini proyectos del mundo real que desarrollan pensamiento crítico, creatividad y colaboración',
  mtc7_b:'Desarrollo de Liderazgo',mtc7_s:'Toma de decisiones, trabajo en equipo y mentoría entre compañeros practicados desde temprana edad',
  mtc8_b:'Educación Financiera',mtc8_s:'Conceptos de dinero apropiados para la edad: ahorro, ganar, presupuestar y el valor del trabajo',
  // Sample Learning Day
  sld_eyebrow:'&#9733; Un día en el currículo',
  sld_h2:'Vea Cómo Es un Día de Aprendizaje',
  sld_p:'Cada grupo de edad sigue su propio horario diario estructurado. Aquí hay un día de muestra para nuestro programa Preescolar (3&ndash;5 años). Cada actividad se vincula directamente a un área de aprendizaje:',
  sld_theme:'&#127912; Tema Semanal: Colores y Formas',
  sld_badge:'Preescolar &bull; Edades 3&ndash;5',
  sld_sub:'Horario de muestra del martes &mdash; guiado por el maestro, alineado al currículo, mapeado por áreas',
  sld_act1:'Llegada y Círculo de Bienvenida Matutino',sld_dom1:'Social-Emocional',
  sld_act2:'Desayuno y Rutina de Autocuidado',sld_dom2:'Vida Práctica',
  sld_act3:'Lección Matutina: Colores en la Naturaleza',sld_dom3:'Ciencias',
  sld_act4:'Estudio de Arte: Experimento de Mezcla de Colores',sld_dom4:'Creatividad',
  sld_act5:'Juego al Aire Libre y Búsqueda de Formas',sld_dom5:'Des. Físico',
  sld_act6:'Hora del Cuento y Discusión de Comprensión',sld_dom6:'Lenguaje',
  sld_act7:'Centros de Matemáticas: Clasificación de Formas y Conteo',sld_dom7:'Matemáticas',
  sld_act8:'Círculo de Liderazgo: Ayudante del Día',sld_dom8:'Liderazgo',
  sld_btn1:'Ver Todos los Programas &rarr;',sld_btn2:'Inscribir a Su Hijo',
  // Parent Portal Preview
  pp_eyebrow:'&#9733; Portal para Padres',
  pp_h2:'Visibilidad en Tiempo Real del Crecimiento de Su Hijo',
  pp_p:'Cada familia inscrita tiene acceso completo al portal de padres de Mini Star. Vea reportes diarios, monitoree el progreso en las 10 áreas de aprendizaje, explore el portafolio de su hijo y comuníquese directamente con su cuidador:',
  pp_r_title:'&#128221; Reporte Diario de Hoy',pp_r_date:'Preescolar',
  pp_r_mood:'&#128512; Feliz',pp_r_ate:'&#129367; Comió bien',pp_r_nap:'&#128564; Siesta corta',
  pp_r_act_head:'Actividades Completadas',
  pp_r_act_text:'Arte de mezcla de colores, clasificación de formas, caminata al aire libre, hora del cuento con discusión',
  pp_r_note_head:'Nota del Cuidador',
  pp_r_note_text:'¡Excelente concentración hoy! Identificó 6 colores de forma independiente durante el tiempo de arte &#9733;',
  pp_prog_title:'&#128202; Progreso de Aprendizaje',pp_prog_date:'Este Mes',
  pp_bar_lang:'Lenguaje',pp_bar_math:'Matemáticas',pp_bar_cre:'Creatividad',pp_bar_lead:'Liderazgo',pp_bar_life:'Hab. de Vida',pp_bar_fin:'Educ. Financiera',
  pp_week_title:'&#128197; Resumen Semanal',pp_week_date:'Esta Semana',
  pp_chip1:'5/5 Días Asistidos',pp_chip2:'8 Actividades Hechas',
  pp_wk_theme_head:'Tema de Esta Semana',
  pp_wk_theme_text:'Colores y Formas &mdash; 3 nuevos logros alcanzados esta semana',
  pp_wk_mile_head:'Logros Alcanzados',
  pp_wk_mile_text:'&#9989; Cuenta hasta 20 &bull; &#9989; Escribe su nombre &bull; &#9989; Mezcla de colores dominada',
  pp_port_title:'&#128241; Portafolio del Niño',pp_port_date:'3 Elementos Esta Semana',
  pp_p1_title:'Arte de Mezcla de Colores',pp_p1_dom:'Creatividad',pp_p1_text:'Creó una rueda de colores usando colores primarios de forma independiente',
  pp_p2_title:'Desafío de Clasificación de Formas',pp_p2_dom:'Matemáticas',pp_p2_text:'Clasificó 12 formas correctamente y explicó las diferencias',
  pp_p3_title:'Ayudante del Día',pp_p3_dom:'Liderazgo',pp_p3_text:'Dirigió el círculo matutino y ayudó a dos compañeros con tareas',
  pp_cta_h3:'¿Listo para ver crecer a su hijo?',
  pp_cta_p:'Inscríbase en Mini Star y obtenga acceso completo a reportes diarios, paneles de progreso de aprendizaje, portafolio del niño y mensajería directa con su cuidador.',
  pp_cta_btn:'Inscribirse Ahora &rarr;',
  // About - Educational Philosophy
  ab_phil_eyebrow:'&#9733; Nuestra filosofía educativa',
  ab_phil_h3:'Criamos niños completos, no solo bien portados',
  ab_phil_p:'En Mini Star, cada niño que entra por nuestras puertas es tratado como un futuro líder, pensador y contribuyente. Nuestro currículo estructurado está diseñado para desarrollar niños que sean:',
  ab_ph1_b:'Aprendices Curiosos',ab_ph1_s:'Niños que preguntan &ldquo;¿por qué?&rdquo; y exploran el mundo con mente abierta',
  ab_ph2_b:'Pensadores Independientes',ab_ph2_s:'Que razonan los problemas y forman sus propias ideas',
  ab_ph3_b:'Solucionadores Creativos',ab_ph3_s:'Que ven los desafíos como oportunidades y encuentran soluciones originales',
  ab_ph4_b:'Individuos Responsables',ab_ph4_s:'Que respetan a los demás, cumplen y asumen responsabilidad',
  ab_ph5_b:'Comunicadores Efectivos',ab_ph5_s:'Que escuchan con atención y se expresan con claridad y confianza',
  ab_ph6_b:'Innovadores Creativos',ab_ph6_s:'Que traen ideas frescas, imaginación y pensamiento inventivo',
  ab_ph7_b:'Inteligentes Emocionalmente',ab_ph7_s:'Que comprenden sus propios sentimientos y empatizan con los demás',
  ab_ph8_b:'Futuros Líderes',ab_ph8_s:'Que inspiran, apoyan y elevan a las personas que los rodean',
  // About - How Caregivers Teach
  ab_teach_eyebrow:'&#9733; Cómo enseñan nuestros cuidadores',
  ab_teach_h3:'Estructurado, intencional y receptivo &mdash; todos y cada uno de los días',
  ab_teach_p:'Nuestros cuidadores no solo supervisan &mdash; enseñan con intención. Así es como el currículo cobra vida cada día:',
  ab_mt1_b:'Preparación Matutina',ab_mt1_s:'El cuidador revisa el plan de lección, materiales y objetivos de cada niño antes de comenzar el día',
  ab_mt2_b:'Planes de Lección Diarios',ab_mt2_s:'Cada grupo de edad sigue un horario estructurado con objetivos, actividades, lista de materiales y lista de evaluación',
  ab_mt3_b:'Observación en Vivo',ab_mt3_s:'Durante las actividades, los cuidadores observan y documentan la participación, concentración y desarrollo de habilidades de cada niño',
  ab_mt4_b:'Completar la Lección',ab_mt4_s:'Las actividades se marcan como completas, parciales o no realizadas &mdash; creando un registro diario preciso',
  ab_mt5_b:'Seguimiento de Logros',ab_mt5_s:'Cuando un niño alcanza un hito de desarrollo, se registra inmediatamente en su perfil personal',
  ab_mt6_b:'Reporte Diario',ab_mt6_s:'Cada día cierra con un reporte completo: estado de ánimo, comidas, siesta, actividades y notas personalizadas del cuidador',
  ab_mt7_b:'Comunicación con Padres',ab_mt7_s:'Los reportes se generan automáticamente de las actividades del currículo completadas y se envían a los padres a través del portal',
  ab_mt8_b:'Planificación Semanal',ab_mt8_s:'Los cuidadores planifican el tema, las actividades y los objetivos diferenciados para cada niño de la semana siguiente',
  // About - For Parents
  ab_par_eyebrow:'&#9733; Para padres',
  ab_par_h3:'Manténgase conectado al aprendizaje de su hijo todos los días',
  ab_par_p:'A través del portal de padres de Mini Star, las familias tienen total transparencia en la educación de su hijo:',
  ab_bi1_b:'Reportes Diarios de Aprendizaje',ab_bi1_s:'Vea exactamente en qué trabajó su hijo, qué comió, su estado de ánimo y una nota personal de su cuidador',
  ab_bi2_b:'Barras de Progreso por Área',ab_bi2_s:'Seguimiento visual del progreso en las 10 áreas de aprendizaje actualizado en tiempo real',
  ab_bi3_b:'Notificaciones de Logros',ab_bi3_s:'Sepa al instante cuando su hijo alcanza un nuevo hito de desarrollo &mdash; nunca se pierda un avance',
  ab_bi4_b:'Portafolio del Niño',ab_bi4_s:'Un registro digital creciente del mejor trabajo, proyectos y momentos de aprendizaje de su hijo',
  ab_bi5_b:'Resúmenes Semanales',ab_bi5_s:'Resúmenes semanales de aprendizaje generados automáticamente con tema, actividades completadas y logros alcanzados',
  ab_bi6_b:'Puntuaciones de Preparación',ab_bi6_s:'Puntuaciones de preparación escolar y para la vida monitoreadas en 8 categorías para que siempre sepa dónde está su hijo',
  ab_bi7_b:'Mensajería Directa',ab_bi7_s:'Comuníquese directamente con el cuidador de su hijo en cualquier momento &mdash; haga preguntas, comparta actualizaciones, manténgase conectado',
  ab_bi8_b:'Seguimiento de Pagos',ab_bi8_s:'Vea facturas, historial de pagos y saldos próximos &mdash; todo en un solo lugar',
  // About - Curriculum Highlights
  ab_ch_eyebrow:'&#9733; Aspectos destacados del currículo',
  ab_ch_h3:'Más allá de lo básico &mdash; desarrollando habilidades para la vida',
  ab_ch_p:'Lo que distingue a Mini Star de la guardería ordinaria &mdash; siete áreas que no encontrará en todos lados:',
  ab_cc1_b:'Pensamiento Crítico',ab_cc1_s:'Razonamiento, análisis y resolución creativa de problemas apropiados para la edad en cada lección',
  ab_cc2_b:'Desarrollo de Liderazgo',ab_cc2_s:'Responsabilidad, toma de decisiones, mentoría entre compañeros y desarrollo de confianza desde la infancia',
  ab_cc3_b:'Educación Financiera',ab_cc3_s:'Valor del dinero, ahorro, ganancias y gastos responsables enseñados en cada nivel de edad',
  ab_cc4_b:'Fundamentos de Emprendimiento',ab_cc4_s:'Pensamiento creativo, iniciativa y mini proyectos de negocios para preescolar y edad escolar',
  ab_cc5_b:'Creatividad e Innovación',ab_cc5_s:'Arte, música, juego dramático y exploración abierta integrados en cada semana',
  ab_cc6_b:'Inteligencia Emocional',ab_cc6_s:'Autorregulación, empatía, resolución de conflictos y relaciones sociales saludables',
  ab_cc7_b:'Habilidades Prácticas de Vida',ab_cc7_s:'Autocuidado, orden, rutinas e independencia en el mundo real desde la edad más temprana',
  ab_about_btn:'Ver Nuestros Programas Completos &rarr;',
  // Programs
  pr_h2:'Currículo Estructurado para Cada Edad &mdash; Del Nacimiento a los 12 Años',
  pr_p:'Nuestro currículo basado en investigación crece con su hijo. Cada programa está adaptado al estadio de desarrollo específico, construyendo conocimiento, carácter y habilidades de vida desde el primer día:',
  jr_inf_age:'0 &ndash; 1 Año',jr_inf_name:'Bebés',jr_inf_focus:'Sensorial y Vínculo',
  jr_tod_age:'1 &ndash; 3 Años',jr_tod_name:'Pequeños',jr_tod_focus:'Lenguaje y Juego',
  jr_pre_age:'3 &ndash; 5 Años',jr_pre_name:'Preescolar',jr_pre_focus:'Preparación Escolar',
  jr_sch_age:'5 &ndash; 12 Años',jr_sch_name:'Edad Escolar',jr_sch_focus:'Liderazgo y Vida',
  adc_goals:'&#127919; Objetivos de Desarrollo',adc_domains:'&#128218; Áreas de Aprendizaje',
  adc_routine:'&#128336; Rutina Diaria',adc_milestones:'&#9989; Hitos Clave Monitoreados',adc_activities:'&#127380; Actividades de Ejemplo',
  inf_title:'Bebés',inf_sub:'Edades 0&ndash;1 año &bull; Cuidado amoroso que apoya cada hito desde el nacimiento',inf_chip:'0&ndash;1 año',
  inf_parents_head:'&#128172; Qué Reciben los Padres',
  tod_title:'Pequeños',tod_sub:'Edades 1&ndash;3 años &bull; Construyendo independencia, lenguaje y pensamiento temprano a través del juego',tod_chip:'1&ndash;3 años',
  tod_finlit_head:'&#128176; Introducción a la Educación Financiera',
  pre_title:'Preescolares',pre_sub:'Edades 3&ndash;5 años &bull; Preparación escolar a través de creatividad, curiosidad y confianza',pre_chip:'3&ndash;5 años',
  pre_leadership_head:'&#127775; Liderazgo y Educación Financiera',
  sch_title:'Edad Escolar',sch_sub:'Edades 5&ndash;12 años &bull; Expandiendo conocimiento, liderazgo y habilidades reales de vida',sch_chip:'5&ndash;12 años',
  sch_entrepreneur_head:'&#128161; Camino al Emprendimiento',
  dom_eyebrow:'&#9733; Lo que aprenden los niños',dom_h3:'10 Áreas Fundamentales de Desarrollo',
  dom_p:'Nuestro currículo abarca cada dimensión del crecimiento del niño &mdash; académica, social, emocional y habilidades de vida &mdash; preparándolos para la escuela y para la vida:',
  dom1_b:'Desarrollo del Lenguaje',dom1_s:'Lectura, expresión oral, escucha y comunicación',
  dom2_b:'Matemáticas Tempranas',dom2_s:'Números, patrones, formas y pensamiento lógico',
  dom3_b:'Ciencias y Descubrimiento',dom3_s:'Exploración, observación y cómo funcionan las cosas',
  dom4_b:'Pensamiento Crítico',dom4_s:'Resolución de problemas, análisis y razonamiento',
  dom5_b:'Creatividad e Innovación',dom5_s:'Arte, música, imaginación e ideas originales',
  dom6_b:'Habilidades de Liderazgo',dom6_s:'Toma de decisiones, trabajo en equipo y responsabilidad',
  dom7_b:'Educación Financiera',dom7_s:'Valor del dinero, ahorro, ganar y presupuestar',
  dom8_b:'Emprendimiento',dom8_s:'Iniciativa, ideas creativas y construcción de soluciones',
  dom9_b:'Habilidades Prácticas de Vida',dom9_s:'Autocuidado, orden, responsabilidad y rutinas',
  dom10_b:'Inteligencia Emocional',dom10_s:'Autoconciencia, empatía y habilidades sociales',
  pr_lead:'Cada día en Mini Star incluye:',
  pr_last_p:'Nuestro programa desarrolla niños seguros e independientes con amor por el aprendizaje de por vida &mdash; no solo un lugar seguro donde esperar.',
  pr_btn:'Preguntar sobre Cupos',
  // Enrollment - Why Different
  en_why_eyebrow:'&#9733; Por qué las familias nos eligen',
  en_why_h3:'¿Qué Hace a Mini Star Diferente?',
  en_why_p:'Esta no es una guardería ordinaria. Esto es lo que obtiene su hijo desde el primer día:',
  en_dc1_b:'Currículo Diario Estructurado',en_dc1_s:'Cada día sigue un plan de lección con objetivos claros, actividades y resultados de aprendizaje &mdash; no solo juego libre todo el día',
  en_dc2_b:'Seguimiento del Desarrollo',en_dc2_s:'El progreso de cada niño en 10 áreas es monitoreado, documentado y compartido con los padres cada semana',
  en_dc3_b:'Comunicación con Padres',en_dc3_s:'Reportes diarios, resúmenes semanales, alertas de logros y mensajería directa con su cuidador &mdash; siempre informado',
  en_dc4_b:'Monitoreo Individual del Crecimiento',en_dc4_s:'Cada niño tiene su propio perfil de crecimiento con logros personalizados, portafolio y observaciones del cuidador',
  en_dc5_b:'Preparación Escolar',en_dc5_s:'Evaluado formalmente en 8 áreas de preparación escolar para que su hijo esté preparado &mdash; académica y socialmente &mdash; antes del kínder',
  en_dc6_b:'Preparación para la Vida',en_dc6_s:'Habilidades prácticas, regulación emocional, educación financiera y liderazgo integrados en el currículo &mdash; preparando a los niños para la vida real',
  // FAQ
  faq_eyebrow:'&#9733; Preguntas de las familias',faq_h3:'Preguntas Frecuentes',
  faq1_q:'¿Es esto una guardería o un programa basado en currículo?',
  faq1_a:'Mini Star es un programa de desarrollo infantil basado en currículo. Aunque brindamos cuidado infantil completo, cada hora está estructurada en torno a planes de lección apropiados para la edad que cubren 10 áreas de desarrollo. Los maestros siguen horarios diarios con objetivos de aprendizaje claros, monitorean el progreso de cada niño y entregan reportes semanales a los padres. No somos un lugar donde se deja al niño y se observa &mdash; enseñamos activamente.',
  faq2_q:'¿Qué edades atienden?',
  faq2_a:'Atendemos niños desde el nacimiento (bebés) hasta los 12 años. Tenemos cuatro programas: Bebés (0&ndash;1 año), Pequeños (1&ndash;3 años), Preescolares (3&ndash;5 años) y Edad Escolar (5&ndash;12 años). Cada programa tiene su propio currículo, horario diario y sistema de seguimiento de hitos.',
  faq3_q:'¿Cómo sabré lo que hizo mi hijo cada día?',
  faq3_a:'Cada familia tiene acceso al portal de padres. Cada día recibe un reporte completo con estado de ánimo, comidas, siesta, actividades completadas y una nota personalizada del cuidador. Cada semana recibe un resumen con el tema, actividades, logros alcanzados y barras de progreso por área.',
  faq4_q:'¿Enseñan educación financiera y liderazgo a niños pequeños?',
  faq4_a:'Sí. Están integrados en cada edad de manera apropiada. Los pequeños exploran &ldquo;mío&rdquo; y &ldquo;compartir&rdquo;. Los preescolares usan tiendas de juguete y cuentan monedas. Los de edad escolar aprenden presupuesto, crean mini planes de negocios y practican liderazgo entre compañeros.',
  faq5_q:'¿Qué es la preparación escolar y cómo la miden?',
  faq5_a:'Cubre 8 áreas: Lenguaje y Comunicación, Pensamiento Matemático, Preparación Social-Emocional, Desarrollo Físico, Pensamiento Creativo, Autorregulación, Conciencia Cultural y Alfabetización Temprana. Evaluamos a cada niño y los padres pueden ver las puntuaciones en el portal.',
  faq6_q:'¿Cuáles son sus horarios y ubicación?',
  faq6_a:'Estamos abiertos las 24 horas, 7 días a la semana. Ubicados en 17735 38th Ave South, SeaTac, WA 98188. Teléfono: (206) 255-4000 &mdash; Correo: ministarchildcare14@gmail.com.',
  faq7_q:'¿Cómo inscribo a mi hijo?',
  faq7_a:'Complete el formulario de inscripción con la información de su familia y su hijo. Revisaremos su solicitud y nos comunicaremos para confirmar disponibilidad. También puede llamar al (206) 255-4000 o escribir a ministarchildcare14@gmail.com.',
  // Age card lists (data-i18n-html on <ul>)
  inf_ul_goals:'<li>Desarrollar apego seguro con los cuidadores</li><li>Desarrollar conciencia sensorial y control motor temprano</li><li>Establecer ritmos consistentes de alimentación y sueño</li><li>Comenzar la comunicación temprana a través de sonidos y gestos</li>',
  inf_ul_domains:'<li>Desarrollo Sensorial</li><li>Lenguaje y Comunicación Temprana</li><li>Habilidades Motoras (gruesas y finas)</li><li>Vínculo Emocional y Seguridad</li><li>Rutinas de Vida Práctica</li>',
  inf_ul_routine:'<li>Alimentación receptiva a demanda</li><li>Tiempo boca abajo y exploración de movimiento</li><li>Juego sensorial: texturas, sonidos, luz</li><li>Canciones, rimas y rutinas narradas</li><li>Descanso y cuidado de confort</li>',
  inf_ul_milestones:'<li>Responde a su nombre y voces conocidas</li><li>Alcanza y agarra objetos</li><li>Se da la vuelta, se sienta con apoyo, se para</li><li>Balbucea e imita sonidos</li><li>Muestra permanencia del objeto</li>',
  inf_ul_activities:'<li>Juegos de peekaboo y esconder el juguete</li><li>Tableros de exploración de texturas</li><li>Juego con espejo y reconocimiento facial</li><li>Sacudir sonajeros y descubrir sonidos</li><li>Sesiones suaves de música y movimiento</li>',
  inf_ul_parents:'<li>Registro diario de alimentación y siesta</li><li>Reporte de estado de ánimo y confort</li><li>Notas de actividades del cuidador</li><li>Alertas de hitos cuando se alcanzan</li><li>Resumen semanal de desarrollo</li>',
  tod_ul_goals:'<li>Expandir vocabulario rápidamente a través de conversación</li><li>Desarrollar independencia en tareas básicas de autocuidado</li><li>Desarrollar comprensión de causa y efecto</li><li>Aprender a expresar emociones apropiadamente</li>',
  tod_ul_domains:'<li>Lenguaje y Comunicación</li><li>Desarrollo Cognitivo</li><li>Habilidades Social-Emocionales</li><li>Vida Práctica y Autocuidado</li><li>Conciencia Temprana de Liderazgo</li>',
  tod_ul_routine:'<li>Hora del círculo: saludos, canciones, movimiento</li><li>Juego estructurado con materiales de aprendizaje</li><li>Merienda y práctica de alimentación propia</li><li>Exploración al aire libre y juego motor grueso</li><li>Hora del cuento y rutina de siesta</li>',
  tod_ul_milestones:'<li>Usa frases de 2 palabras luego oraciones completas</li><li>Clasifica por color, forma y tamaño</li><li>Sigue instrucciones de 2 pasos</li><li>Se lava las manos con recordatorios</li><li>Juega junto a otros y comienza a cooperar</li>',
  tod_ul_activities:'<li>Juegos de apilamiento de bloques y derribo</li><li>Bandejas de clasificación de colores y rompecabezas</li><li>Cocina de juguete y juego dramático</li><li>Pintura con dedos y cubetas sensoriales</li><li>&ldquo;Ayudante del día&rdquo; &mdash; rotación de tareas</li>',
  tod_ul_finlit:'<li>Conceptos de &ldquo;mío&rdquo; y &ldquo;compartir&rdquo;</li><li>Juego de tienda y &ldquo;comprar&rdquo; artículos</li><li>Entender &ldquo;esperamos&rdquo; vs. &ldquo;tomamos ahora&rdquo;</li><li>Ayudar a ordenar materiales (propiedad)</li>',
  pre_ul_goals:'<li>Desarrollar habilidades de prelectura y escritura temprana</li><li>Desarrollar sentido numérico y conceptos matemáticos tempranos</li><li>Aprender a trabajar colaborativamente en grupos</li><li>Desarrollar confianza a través de roles de liderazgo</li>',
  pre_ul_domains:'<li>Alfabetización y Artes del Lenguaje</li><li>Matemáticas Tempranas</li><li>Pensamiento Crítico y Resolución de Problemas</li><li>Creatividad e Innovación</li><li>Liderazgo y Educación Financiera</li>',
  pre_ul_routine:'<li>Reunión matutina: calendario, clima, tema</li><li>Lección estructurada de alfabetización y matemáticas</li><li>Estudio de arte o exploración científica</li><li>Juego al aire libre con objetivos de aprendizaje</li><li>Círculo de liderazgo y tiempo de reflexión</li>',
  pre_ul_milestones:'<li>Reconoce las 26 letras (mayúsculas y minúsculas)</li><li>Cuenta hasta 20 y entiende cantidades</li><li>Escribe su propio nombre legiblemente</li><li>Narra un cuento con principio/medio/final</li><li>Resuelve conflictos con palabras</li>',
  pre_ul_activities:'<li>Experimentos científicos de formas y mezcla de colores</li><li>Práctica de formación de letras y juegos de sonidos</li><li>Tienda de juguete con conteo de monedas</li><li>Mural grupal y proyectos de arte colaborativo</li><li>Diario de naturaleza y caminatas de observación</li>',
  pre_ul_leadership:'<li>Rotaciones semanales de &ldquo;Ayudante del Día&rdquo;</li><li>Ejercicios de toma de decisiones en grupo</li><li>Ahorrar monedas para una &ldquo;compra&rdquo; de clase</li><li>Mini emprendimiento: diseñar y vender arte</li>',
  sch_ul_goals:'<li>Fortalecer habilidades académicas en todas las materias</li><li>Desarrollar habilidades de liderazgo, trabajo en equipo y mentoría</li><li>Desarrollar educación financiera y mentalidad emprendedora</li><li>Prepararse para la independencia en el mundo real</li>',
  sch_ul_domains:'<li>Apoyo Académico y Pensamiento Crítico</li><li>Desarrollo de Liderazgo</li><li>Educación Financiera y Emprendimiento</li><li>Aprendizaje Basado en Proyectos</li><li>Inteligencia Emocional y Habilidades de Vida</li>',
  sch_ul_routine:'<li>Apoyo con tareas con guía del cuidador</li><li>Actividad de enriquecimiento estructurada (STEAM, arte, etc.)</li><li>Actividad física o proyecto al aire libre</li><li>Desafío de liderazgo o emprendimiento</li><li>Círculo de reflexión y establecimiento de metas</li>',
  sch_ul_milestones:'<li>Comprensión lectora al nivel del grado</li><li>Resolución de problemas matemáticos de múltiples pasos</li><li>Completa un proyecto desde la idea hasta la presentación</li><li>Orienta a un niño más pequeño de forma independiente</li><li>Crea y explica un presupuesto simple</li>',
  sch_ul_activities:'<li>Creación y presentación de mini planes de negocios</li><li>Desafíos STEAM: construir, probar, mejorar</li><li>Club de debate y escritura persuasiva</li><li>Proyectos de investigación sobre ayudantes comunitarios</li><li>Diarios de metas y tableros de visión</li>',
  sch_ul_entrepreneurship:'<li>Etapa 1: Identificar problemas que vale la pena resolver</li><li>Etapa 2: Diseñar y crear un prototipo de solución</li><li>Etapa 3: Presentar a compañeros y recibir retroalimentación</li><li>Planificación de presupuesto para un micro-proyecto de clase</li>',
  pr_star_ul:'<li>Aprendizaje estructurado alineado a la edad y etapa de desarrollo de cada niño</li><li>Actividades creativas prácticas con objetivos de aprendizaje claros</li><li>Desarrollo de habilidades social-emocionales e interacción grupal guiada</li><li>Supervisión atenta y amorosa de cuidadores capacitados</li><li>Seguimiento del progreso y reportes para padres entregados cada semana</li>',
  // Incidents
  inc_title:'Incidentes',inc_new:'Nuevo Incidente',inc_none:'No hay incidentes registrados.',
  inc_child:'Niño',inc_date:'Fecha',inc_time:'Hora',inc_loc:'Lugar',inc_desc:'Descripción',
  inc_injury:'Tipo de Lesión',inc_aid:'Primeros Auxilios',inc_sev:'Severidad',inc_status:'Estado',
  inc_notified:'Padre Notificado',inc_mark_notified:'Marcar Notificado',
  inc_sev_low:'Leve',inc_sev_med:'Moderado',inc_sev_high:'Grave',
  inc_st_open:'Abierto',inc_st_resolved:'Resuelto',inc_st_closed:'Cerrado',
  inc_save:'Guardar Incidente',inc_cancel:'Cancelar',inc_detail:'Ver Detalle',
  // Medications
  med_title:'Medicamentos',med_new:'Nuevo Medicamento',med_none:'Sin medicamentos activos.',
  med_child:'Niño',med_name_lbl:'Medicamento',med_dose:'Dosis',med_freq:'Frecuencia',
  med_instr:'Instrucciones',med_by:'Recetado por',med_auth:'Autorizado por Padre',
  med_log:'Registrar Administración',med_log_title:'Historial de Administración',
  med_given:'Dado a las',med_missed:'Dosis Perdida',med_notes:'Notas',
  med_deactivate:'Desactivar',med_log_btn:'Registrar',med_log_none:'Sin registros hoy.',
  med_logs_today:'Registros de Hoy',med_active:'Activo',
  // Calendar
  cal_title:'Calendario',cal_new:'Nuevo Evento',cal_none:'No hay eventos.',
  cal_month:'Mes',cal_week:'Semana',cal_agenda:'Agenda',
  cal_ev_title:'Título del Evento',cal_ev_desc:'Descripción',cal_ev_type:'Tipo',
  cal_ev_start:'Fecha de Inicio',cal_ev_end:'Fecha de Fin',cal_ev_time_s:'Hora de Inicio',cal_ev_time_e:'Hora de Fin',
  cal_ev_allday:'Todo el día',cal_ev_save:'Guardar Evento',cal_ev_del:'Eliminar',cal_ev_edit:'Editar',
  cal_type_holiday:'Día Festivo',cal_type_meeting:'Reunión',
  cal_type_activity:'Actividad',cal_type_reminder:'Recordatorio',cal_today:'Hoy',
  // Notifications
  notif_title:'Notificaciones',notif_none:'Sin notificaciones nuevas.',notif_unread:'No leídas',
  notif_mark_read:'Marcar leída',notif_mark_all:'Marcar todas como leídas',
  notif_all:'Todas',notif_loading:'Cargando notificaciones...',notif_ago:'hace',
  // Attendance
  att_title:'Asistencia',att_none:'Sin registros de asistencia.',
  att_present:'Presente',att_absent:'Ausente',att_late:'Tarde',
  att_early:'Salida Temprana',att_excused:'Justificado',
  att_in:'Entrada',att_out:'Salida',att_notes:'Notas',att_save:'Guardar',
  att_daily:'Diario',att_weekly:'Semanal',att_monthly:'Mensual',
  att_stats:'Estadísticas',att_total:'Total de Días',att_rate:'Tasa de Asistencia',
  att_filter_date:'Filtrar por Fecha',att_classroom:'Salón',att_mark:'Marcar Asistencia',
  att_bulk_save:'Guardar Todo',att_child:'Niño',att_status:'Estado',att_date:'Fecha',
  // Shared
  no_server:'Conexión al servidor requerida. Inicie sesión con su cuenta real.',
  loading:'Cargando...',err_load:'Error al cargar datos. Intente de nuevo.',
  // Forgot/Reset password
  pw_forgot:'¿Olvidó su Contraseña?',pw_reset_title:'Restablecer Contraseña',
  pw_reset_user:'Nombre de Usuario',pw_reset_code:'Código de Restablecimiento',
  pw_reset_new:'Nueva Contraseña',pw_reset_btn:'Restablecer',pw_reset_back:'Volver al Inicio de Sesión',
  pw_reset_sent:'Si la cuenta existe, se generó un código. Contacte al administrador para obtenerlo.',
  pw_request_btn:'Solicitar Código'
};
const I18N_EN = {};
document.querySelectorAll('[data-i18n]').forEach(el => { I18N_EN[el.dataset.i18n] = el.innerHTML; });
document.querySelectorAll('[data-i18n-html]').forEach(el => { I18N_EN[el.dataset.i18nHtml] = el.innerHTML; });

function t(en, es) { return LANG === 'es' ? es : en; }
function applyLang() {
  const dict = LANG === 'es' ? I18N_ES : I18N_EN;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = dict[el.dataset.i18n];
    if (v != null) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = dict[el.dataset.i18nHtml];
    if (v != null) el.innerHTML = v;
  });
  const tg = document.getElementById('lang-toggle');
  if (tg) tg.textContent = LANG === 'es' ? 'English' : 'Espanol';
  document.documentElement.lang = LANG;
}
function toggleLang() { LANG = LANG === 'es' ? 'en' : 'es'; applyLang(); renderPortal(); renderEnrollment(); }

/* ---------- API helpers ---------- */
let _NOTIF_UNREAD = null;
let _SSE_SOURCE = null;
function apiToken() { return localStorage.getItem('ms_token') || ''; }
function apiFetch(url, opts) {
  opts = opts || {};
  const tk = apiToken();
  opts.headers = Object.assign({'Content-Type':'application/json'}, tk ? {Authorization:'Bearer '+tk} : {}, opts.headers || {});
  return fetch(url, opts);
}
function loadingCard() {
  return `<div class="card"><p class="soft" style="text-align:center;padding:20px">&#9203; ${t('Loading...','Cargando...')}</p></div>`;
}
function errCard() {
  return `<div class="card"><p class="soft" style="text-align:center;padding:20px;color:var(--coral)">&#9888; ${t('Error loading data. Try again.','Error al cargar datos. Intente de nuevo.')}</p></div>`;
}
function noTokenCard() {
  return `<div class="card"><p class="soft" style="text-align:center;padding:20px">&#128274; ${t('Server connection required. Log in with your real account to use this feature.','Conexion al servidor requerida. Inicie sesion con su cuenta real para usar esta funcion.')}</p></div>`;
}

/* ---------- helpers ---------- */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function uid() { return 'id' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function today() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function nowTime() {
  const d = new Date();
  return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
}
function fmtDate(s) {
  try { return new Date(s + 'T00:00').toLocaleDateString(LANG === 'es' ? 'es-US' : 'en-US', {weekday:'short',month:'short',day:'numeric',year:'numeric'}); }
  catch(e) { return s; }
}

const CLS_ES = {Infants:'Bebes',Toddlers:'Ninos Pequenos',Preschool:'Preescolar','School-Age':'Edad Escolar'};
function clsName(id) {
  const c = DB.classes.find(x => x.id === id);
  if (!c) return '-';
  return LANG === 'es' ? (CLS_ES[c.name] || c.name) : c.name;
}
function roleLabel(r) {
  return ({admin: t('Admin','Administrador'), teacher: t('Teacher','Maestro/a'), parent: t('Parent','Padre/Madre')})[r] || r;
}
function userById(id) { return DB.users.find(u => u.id === id); }
function childById(id) { return DB.children.find(c => c.id === id); }
function parentChildren(u) { return DB.children.filter(c => (c.parentIds || []).includes(u.id)); }
function childAge(dob) {
  if (!dob) return '';
  const diff = Date.now() - new Date(dob).getTime();
  const years = Math.floor(diff / (365.25 * 24 * 3600 * 1000));
  if (years < 1) {
    const months = Math.floor(diff / (30.44 * 24 * 3600 * 1000));
    return months + ' ' + t('mo','m');
  }
  return years + ' ' + t('yr','a');
}

/* ---------- localStorage storage ---------- */
const STORAGE_KEY = 'ministar_db';
let DB = null;
let CU = null; // current user
let AUTH_TAB = 'login';
let SUB = 'overview';
let FORM_MOOD = '';
let PARENT_CHILD = '';

function loadDB() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) { try { DB = JSON.parse(raw); } catch(e) { DB = null; } }
  if (!DB) seedDB();
  // ensure all collections exist
  DB.classes = DB.classes || [];
  DB.users = DB.users || [];
  DB.children = DB.children || [];
  DB.enrollments = DB.enrollments || [];
  DB.reports = DB.reports || [];
  DB.messages = DB.messages || [];
  // ensure curriculum collection always exists (curriculum.js may not have run initCurriculumDB yet)
  if (!DB.curriculum) DB.curriculum = {};
  DB.curriculum.plans          = DB.curriculum.plans          || [];
  DB.curriculum.milestones     = DB.curriculum.milestones     || [];
  DB.curriculum.teacherNotes   = DB.curriculum.teacherNotes   || [];
  DB.curriculum.weekThemes     = DB.curriculum.weekThemes     || [];
  DB.curriculum.successMetrics = DB.curriculum.successMetrics || [];
  DB.curriculum.portfolio      = DB.curriculum.portfolio      || [];
  DB.curriculum.projects       = DB.curriculum.projects       || [];
  DB.curriculum.readinessScores   = DB.curriculum.readinessScores   || [];
  DB.curriculum.flMilestones      = DB.curriculum.flMilestones      || [];
  DB.curriculum.leadershipProgress = DB.curriculum.leadershipProgress || [];
  // remove payments if still stored from old version
  delete DB.payments;
  saveDB();
}
function saveDB() { localStorage.setItem(STORAGE_KEY, JSON.stringify(DB)); }

function seedDB() {
  const classIds = { infants: uid(), toddlers: uid(), preschool: uid(), school: uid() };
  const userIds = {
    admin: uid(), teacher1: uid(), teacher2: uid(),
    parent1: uid(), parent2: uid(), parent3: uid()
  };
  const childIds = [uid(), uid(), uid(), uid(), uid(), uid()];

  DB = {
    classes: [
      { id: classIds.infants, name: 'Infants' },
      { id: classIds.toddlers, name: 'Toddlers' },
      { id: classIds.preschool, name: 'Preschool' },
      { id: classIds.school, name: 'School-Age' }
    ],
    users: [
      { id: userIds.admin, name: 'Admin', username: 'admin', password: 'admin123', role: 'admin', classId: null },
      { id: userIds.teacher1, name: 'Maria Santos', username: 'teacher1', password: 'demo123', role: 'teacher', classId: classIds.infants },
      { id: userIds.teacher2, name: 'James Lee', username: 'teacher2', password: 'demo123', role: 'teacher', classId: classIds.preschool },
      { id: userIds.parent1, name: 'Sarah Johnson', username: 'parent1', password: 'demo123', role: 'parent', classId: null, phone: '(206) 555-0100', email: 'sarah@email.com' },
      { id: userIds.parent2, name: 'Carlos Garcia', username: 'parent2', password: 'demo123', role: 'parent', classId: null, phone: '(206) 555-0200', email: 'carlos@email.com' },
      { id: userIds.parent3, name: 'Amina Hassan', username: 'parent3', password: 'demo123', role: 'parent', classId: null, phone: '(206) 555-0300', email: 'amina@email.com' }
    ],
    children: [
      { id: childIds[0], name: 'Emma Johnson', dob: '2023-08-15', classId: classIds.infants, parentIds: [userIds.parent1], allergies: 'Peanuts', food: 'Pureed vegetables, formula', emergencyContact: 'David Johnson', emergencyPhone: '(206) 555-0101', notes: 'Loves music time' },
      { id: childIds[1], name: 'Liam Johnson', dob: '2022-03-22', classId: classIds.toddlers, parentIds: [userIds.parent1], allergies: '', food: 'No restrictions', emergencyContact: 'David Johnson', emergencyPhone: '(206) 555-0101', notes: '' },
      { id: childIds[2], name: 'Sofia Garcia', dob: '2021-11-05', classId: classIds.preschool, parentIds: [userIds.parent2], allergies: 'Dairy', food: 'Lactose-free meals only', emergencyContact: 'Ana Garcia', emergencyPhone: '(206) 555-0202', notes: 'Bilingual - Spanish/English' },
      { id: childIds[3], name: 'Noah Garcia', dob: '2020-06-18', classId: classIds.preschool, parentIds: [userIds.parent2], allergies: '', food: 'No restrictions', emergencyContact: 'Ana Garcia', emergencyPhone: '(206) 555-0202', notes: '' },
      { id: childIds[4], name: 'Mia Hassan', dob: '2019-01-30', classId: classIds.school, parentIds: [userIds.parent3], allergies: 'Tree nuts', food: 'No nuts of any kind', emergencyContact: 'Omar Hassan', emergencyPhone: '(206) 555-0303', notes: 'After-school pickup at 5pm' },
      { id: childIds[5], name: 'Oliver Hassan', dob: '2017-09-12', classId: classIds.school, parentIds: [userIds.parent3], allergies: '', food: 'No restrictions', emergencyContact: 'Omar Hassan', emergencyPhone: '(206) 555-0303', notes: '' }
    ],
    enrollments: [
      {
        id: uid(),
        parentInfo: { name: 'Fatima Ali', phone: '(206) 555-0404', email: 'fatima@email.com', username: 'fatima_ali' },
        childInfo: { name: 'Yusuf Ali', dob: '2022-09-10', classPreference: classIds.toddlers, allergies: '', food: 'Halal only', medical: '', emergencyName: 'Ahmed Ali', emergencyPhone: '(206) 555-0405', startDate: '2026-07-01', notes: 'Only halal food please' },
        status: 'pending', submittedDate: today(), assignedClassId: null, childId: null, parentId: null
      },
      {
        id: uid(),
        parentInfo: { name: 'Kevin Park', phone: '(206) 555-0505', email: 'kevin@email.com', username: 'kevin_park' },
        childInfo: { name: 'Lily Park', dob: '2020-04-15', classPreference: classIds.preschool, allergies: 'Eggs', food: 'No eggs in any form', medical: 'Mild eczema - has prescribed cream', emergencyName: 'Jenny Park', emergencyPhone: '(206) 555-0506', startDate: '2026-07-07', notes: '' },
        status: 'pending', submittedDate: today(), assignedClassId: null, childId: null, parentId: null
      }
    ],
    reports: [
      { id: uid(), childId: childIds[0], teacherId: userIds.teacher1, date: today(), checkIn: '07:30', checkOut: '', mood: 'happy', meals: 'Ate all of breakfast, good lunch', nap: '12:00 - 2:30 PM', activities: 'Tummy time, music, sensory play', note: 'Emma had a wonderful day! She smiled and cooed during music time.' },
      { id: uid(), childId: childIds[2], teacherId: userIds.teacher2, date: today(), checkIn: '08:00', checkOut: '', mood: 'energetic', meals: 'Full breakfast, half lunch', nap: '1:00 - 2:00 PM', activities: 'Painting, story time, outdoor play', note: 'Sofia led the class in a counting game today!' }
    ],
    messages: [
      { id: uid(), fromId: userIds.teacher1, toId: userIds.parent1, childId: childIds[0], text: 'Emma had a great day today! She really enjoyed tummy time and responded well to music.', date: today(), time: '14:30', read: false },
      { id: uid(), fromId: userIds.parent1, toId: userIds.teacher1, childId: childIds[0], text: 'Thank you so much for the update! We will keep up the music at home too.', date: today(), time: '15:45', read: true }
    ]
  };
  saveDB();
}

/* ---------- auth ---------- */
function doLogin(username, password) {
  return DB.users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password) || null;
}
function errT(e) {
  const m = String(e && e.message || '');
  if (m === 'taken') return t('That username is already taken.', 'Ese usuario ya esta en uso.');
  if (m === 'missing') return t('Please fill in all fields.', 'Por favor complete todos los campos.');
  if (m === 'wrong') return t('Wrong username or password.', 'Usuario o contrasena incorrectos.');
  if (m === 'short') return t('Password must be at least 6 characters.', 'La contrasena debe tener al menos 6 caracteres.');
  return t('Something went wrong. Please try again.', 'Algo salio mal. Intentelo de nuevo.');
}
function msg(id, text, ok) {
  const el = document.getElementById(id);
  if (el) { el.textContent = text; el.className = 'form-msg ' + (ok ? 'ok' : 'err'); }
}

/* ---------- render root ---------- */
function renderPortal() {
  const root = document.getElementById('portal-root');
  if (!root) return;
  if (!CU) { root.innerHTML = authView(); return; }
  let body = '';
  if (CU.role === 'admin') body = adminView();
  else if (CU.role === 'teacher') body = teacherView();
  else body = parentView();
  root.innerHTML = `
    <div class="portal-head">
      <div>
        <h2>${t('Hello','Hola')}, ${esc(CU.name)} &#128075;</h2>
        <span class="role-chip role-${CU.role}">${roleLabel(CU.role)}</span>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="mini-btn ghost" onclick="renderPortal()">&#8635; ${t('Refresh','Actualizar')}</button>
        <button class="mini-btn ghost" onclick="changePassword()">&#128273; ${t('Change Password','Cambiar Contrasena')}</button>
        <button class="mini-btn danger" onclick="logout()">&#128682; ${t('Log out','Cerrar sesion')}</button>
      </div>
    </div>` + body;
}

/* ---------- auth view ---------- */
function authView() {
  if (_FORGOT_STEP > 0) return forgotPasswordView();
  return `
  <div class="demo-banner">
    <b>${t('Demo Accounts','Cuentas de Demostración')}</b><br>
    ${t('Admin:','Admin:')} admin / admin123 &nbsp;|&nbsp;
    ${t('Teacher:','Maestro:')} teacher1 / demo123 &nbsp;|&nbsp;
    ${t('Parent:','Padre/Madre:')} parent1 / demo123
  </div>
  <div class="portal-card">
    <div class="portal-logo"><img src="images/logo.png" alt="Mini Star logo"></div>
    <h2 style="text-align:center;font-size:1.4rem">${t('Family &amp; Staff Portal','Portal de Familias y Personal')}</h2>
    <p class="soft" style="text-align:center;font-size:.9rem;margin-bottom:4px">${t('Sign in to access daily reports and messages.','Inicia sesion para ver reportes y mensajes.')}</p>
    <div class="pill-tabs">
      <button class="${AUTH_TAB === 'login' ? 'active' : ''}" onclick="AUTH_TAB='login';renderPortal()">${t('Sign In','Iniciar Sesion')}</button>
      <button class="${AUTH_TAB === 'signup' ? 'active' : ''}" onclick="AUTH_TAB='signup';renderPortal()">${t('Parent Sign Up','Registro de Padres')}</button>
    </div>
    ${AUTH_TAB === 'login' ? `
      <div class="field"><label>${t('Username','Usuario')}</label><input id="li-user" autocomplete="username" placeholder="admin"></div>
      <div class="field"><label>${t('Password','Contrasena')}</label><input id="li-pass" type="password" autocomplete="current-password" placeholder="admin123"></div>
      <button class="btn btn-night btn-full" onclick="login()">${t('Sign In','Iniciar Sesion')}</button>
      <p style="text-align:center;margin-top:10px"><button class="mini-btn ghost" style="font-size:.82rem" onclick="showForgotPassword()">&#128273; ${t('Forgot Password?','¿Olvidé mi Contraseña?')}</button></p>
    ` : `
      <div class="field"><label>${t('Your full name','Su nombre completo')}</label><input id="su-name" placeholder="${t('e.g. Maria Gonzalez','Ej.: Maria Gonzalez')}"></div>
      <div class="field"><label>${t('Choose a username','Elija un usuario')}</label><input id="su-user"></div>
      <div class="field"><label>${t('Choose a password (min 6 chars)','Elija una contrasena (min 6)')}</label><input id="su-pass" type="password"></div>
      <button class="btn btn-teal btn-full" onclick="signupParent()">${t('Create Parent Account','Crear Cuenta de Padre')}</button>
      <p class="soft" style="font-size:.82rem;margin-top:10px">${t('After signing up, an admin will link your child to your account.','Despues de registrarse, el admin vinculara a su hijo.')}</p>
    `}
    <div class="form-msg" id="auth-msg"></div>
  </div>`;
}

function login() {
  const u = document.getElementById('li-user').value.trim();
  const p = document.getElementById('li-pass').value;
  if (!u || !p) { msg('auth-msg', errT(new Error('missing'))); return; }
  const found = doLogin(u, p);
  if (!found) { msg('auth-msg', errT(new Error('wrong'))); return; }
  CU = found;
  SUB = CU.role === 'admin' ? 'overview' : (CU.role === 'teacher' ? 'class' : 'children');
  PARENT_CHILD = '';
  // Try API login silently to get JWT token for server features
  fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:u,password:p})})
    .then(r=>r.ok?r.json():null).then(d=>{
      if(d&&d.token){localStorage.setItem('ms_token',d.token);_NOTIF_UNREAD=null;_initSSE();renderPortal();}
    }).catch(()=>{});
  renderPortal();
}

function logout() { CU = null; AUTH_TAB = 'login'; SUB = 'overview'; localStorage.removeItem('ms_token'); _NOTIF_UNREAD=null; if(_SSE_SOURCE){_SSE_SOURCE.close();_SSE_SOURCE=null;} renderPortal(); }

function signupParent() {
  const name = (document.getElementById('su-name').value || '').trim();
  const u = (document.getElementById('su-user').value || '').trim();
  const p = (document.getElementById('su-pass').value || '');
  if (!name || !u || !p) { msg('auth-msg', errT(new Error('missing'))); return; }
  if (p.length < 6) { msg('auth-msg', errT(new Error('short'))); return; }
  if (DB.users.find(x => x.username.toLowerCase() === u.toLowerCase())) { msg('auth-msg', errT(new Error('taken'))); return; }
  const nu = { id: uid(), name, username: u, password: p, role: 'parent', classId: null };
  DB.users.push(nu);
  saveDB();
  CU = nu;
  SUB = 'children';
  renderPortal();
}

/* ---------- subtabs helper ---------- */
function subtabs(items) {
  return '<div class="subtabs">' + items.map(([k, l]) =>
    `<button class="${SUB === k ? 'active' : ''}" onclick="SUB='${k}';EDIT_CHILD_ID=null;renderPortal()">${l}</button>`
  ).join('') + '</div>';
}

/* ===================== ADMIN ===================== */
function adminView() {
  const pendingCount = DB.enrollments.filter(e => e.status === 'pending').length;
  let h = subtabs([
    ['overview',    '&#128202; ' + t('Overview','Resumen')],
    ['enrollments', '&#128221; ' + t('Enrollments','Inscripciones') + (pendingCount ? ` <span style="background:var(--coral);color:#fff;border-radius:999px;font-size:.65rem;padding:1px 7px;margin-left:2px">${pendingCount}</span>` : '')],
    ['children',    '&#128118; ' + t('Children','Ninos')],
    ['staff',       '&#129489; ' + t('Staff','Personal')],
    ['parents',     '&#128106; ' + t('Parents','Padres')],
    ['reports',     '&#128203; ' + t('Reports','Reportes')],
    ['messages',    '&#128172; ' + t('Messages','Mensajes')],
    ['curriculum',  '&#127963; ' + t('Curriculum','Curriculo')],
    ['incidents',   '&#128680; ' + t('Incidents','Incidentes')],
    ['medications', '&#128138; ' + t('Medications','Medicamentos')],
    ['attendance',  '&#9989; '   + t('Attendance','Asistencia')],
    ['calendar',    '&#128197; ' + t('Calendar','Calendario')],
    ['notifications','&#128276; ' + t('Notifications','Notificaciones') + (_NOTIF_UNREAD ? ` <span style="background:var(--coral);color:#fff;border-radius:999px;font-size:.65rem;padding:1px 7px;margin-left:2px">${_NOTIF_UNREAD}</span>` : '')]
  ]);

  /* --- overview --- */
  if (SUB === 'overview') {
    const td = today();
    h += `
    <div class="stat-grid">
      <div class="stat-box"><div class="stat-num">${DB.children.length}</div><div class="stat-lbl">${t('Children','Ninos')}</div></div>
      <div class="stat-box"><div class="stat-num">${DB.users.filter(u => u.role === 'teacher').length}</div><div class="stat-lbl">${t('Teachers','Maestros')}</div></div>
      <div class="stat-box"><div class="stat-num">${DB.users.filter(u => u.role === 'parent').length}</div><div class="stat-lbl">${t('Parents','Padres')}</div></div>
      <div class="stat-box"><div class="stat-num">${DB.reports.filter(r => r.date === td).length}</div><div class="stat-lbl">${t("Today's Reports",'Reportes Hoy')}</div></div>
    </div>
    <div class="stat-grid" style="margin-top:0">
      <div class="stat-box" style="border-top:4px solid var(--gold)"><div class="stat-num">${DB.messages.filter(m => !m.read).length}</div><div class="stat-lbl">${t('Unread Msgs','Mensajes')}</div></div>
      <div class="stat-box" style="border-top:4px solid var(--night)"><div class="stat-num">${DB.classes.length}</div><div class="stat-lbl">${t('Classrooms','Salones')}</div></div>
    </div>
    <div class="card" style="margin-top:6px">
      <p class="lead">${t('Quick Guide','Guia Rapida')}</p>
      <ul class="star-list">
        <li>${t('Add teachers under <b>Staff</b> and assign each a classroom.','Agregue maestros en <b>Personal</b> y asigne un salon a cada uno.')}</li>
        <li>${t('Add children under <b>Children</b> and link them to parents.','Agregue ninos en <b>Ninos</b> y vinculelos con sus padres.')}</li>
        <li>${t('View all teacher-parent messages under <b>Messages</b>.','Vea los mensajes en <b>Mensajes</b>.')}</li>
      </ul>
    </div>`;
  }

  /* --- enrollments --- */
  if (SUB === 'enrollments') {
    const pending = DB.enrollments.filter(e => e.status === 'pending');
    const done = DB.enrollments.filter(e => e.status !== 'pending');
    if (!DB.enrollments.length) {
      h += `<div class="empty">${t('No enrollment requests yet.','Aun no hay solicitudes de inscripcion.')}</div>`;
    }
    if (pending.length) {
      h += `<p class="lead" style="color:var(--coral);margin-bottom:10px">&#9888; ${pending.length} ${t('Pending Review','Pendientes de Revision')}</p>`;
      h += pending.map(e => enrollmentCard(e, true)).join('');
    }
    if (done.length) {
      h += `<p class="lead" style="margin-top:18px;margin-bottom:10px">&#9989; ${t('Processed','Procesadas')}</p>`;
      h += done.map(e => enrollmentCard(e, false)).join('');
    }
  }

  /* --- children --- */
  if (SUB === 'children') {
    const parents = DB.users.filter(u => u.role === 'parent');
    h += `<div class="card">
      <p class="lead">${t('Add a Child','Agregar un Nino')}</p>
      <div class="field"><label>${t("Child's Name",'Nombre del Nino')}</label><input id="nc-name"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="field" style="margin:0"><label>${t('Date of Birth','Fecha de Nacimiento')}</label><input type="date" id="nc-dob"></div>
        <div class="field" style="margin:0"><label>${t('Classroom','Salon')}</label><select id="nc-class">${DB.classes.map(c => `<option value="${c.id}">${esc(LANG === 'es' ? (CLS_ES[c.name] || c.name) : c.name)}</option>`).join('')}</select></div>
      </div>
      <div class="field"><label>${t('Allergies (if any)','Alergias (si aplica)')}</label><input id="nc-allergy" placeholder="${t('e.g. Peanuts','Ej.: Cacahuates')}"></div>
      <div class="field"><label>${t('Food / Dietary Needs','Comida / Dieta')}</label><input id="nc-food" placeholder="${t('e.g. Halal only, no dairy','Ej.: Solo halal, sin lacteos')}"></div>
      <div class="field"><label>${t('Emergency Contact','Contacto de Emergencia')}</label><input id="nc-ec" placeholder="${t('Name & phone number','Nombre y telefono')}"></div>
      <div class="field"><label>${t('Notes','Notas')}</label><input id="nc-notes" placeholder="${t('Special instructions...','Instrucciones especiales...')}"></div>
      <div class="field"><label>${t('Link Parents','Vincular Padres')}</label>
        ${parents.length
          ? `<div style="display:flex;flex-direction:column;gap:6px;background:var(--cream);border-radius:14px;padding:10px 12px;border:2px solid #EAE2DA">
              ${parents.map(p => `<label style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;background:#fff;border:2px solid #EAE2DA;cursor:pointer;transition:.15s" onchange="this.style.background=this.querySelector('input').checked?'#DCEFE9':'#fff';this.style.borderColor=this.querySelector('input').checked?'var(--teal)':'#EAE2DA'">
                <input type="checkbox" class="nc-parent" value="${p.id}" style="width:18px;height:18px;accent-color:var(--teal);flex-shrink:0">
                <div>
                  <div style="font-weight:800;color:var(--night);font-size:.95rem">${esc(p.name)}</div>
                  <div style="font-size:.76rem;color:var(--muted)">@${esc(p.username)}${p.phone ? '  &middot;  ' + esc(p.phone) : ''}</div>
                </div>
              </label>`).join('')}
            </div>`
          : `<p class="soft" style="font-size:.85rem;margin:0">${t('No parent accounts yet.','Aun no hay cuentas de padres.')}</p>`}
      </div>
      <button class="btn btn-teal" onclick="addChild()">${t('Add Child','Agregar Nino')}</button>
      <div class="form-msg" id="nc-msg"></div>
    </div>`;
    if (EDIT_CHILD_ID) {
      const ec = DB.children.find(x => x.id === EDIT_CHILD_ID);
      if (ec) h += childEditForm(ec, true);
    }
    h += DB.children.length ? DB.children.map(c => childListItem(c, true)).join('')
      : `<div class="empty">${t('No children added yet.','Aun no se han agregado ninos.')}</div>`;
  }

  /* --- staff --- */
  if (SUB === 'staff') {
    h += `<div class="card">
      <p class="lead">${t('Add a Teacher','Agregar un Maestro')}</p>
      <div class="field"><label>${t("Teacher's Name",'Nombre del Maestro')}</label><input id="nt-name"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="field" style="margin:0"><label>${t('Username','Usuario')}</label><input id="nt-user"></div>
        <div class="field" style="margin:0"><label>${t('Password','Contrasena')}</label><input id="nt-pass" type="password"></div>
      </div>
      <div class="field"><label>${t('Assign Classroom','Asignar Salon')}</label><select id="nt-class">${DB.classes.map(c => `<option value="${c.id}">${esc(LANG === 'es' ? (CLS_ES[c.name] || c.name) : c.name)}</option>`).join('')}</select></div>
      <button class="btn btn-teal" onclick="addTeacher()">${t('Add Teacher','Agregar Maestro')}</button>
      <div class="form-msg" id="nt-msg"></div>
    </div>`;
    const teachers = DB.users.filter(u => u.role === 'teacher');
    h += teachers.length ? teachers.map(te => `
      <div class="list-item">
        <div class="grow">
          <b>${esc(te.name)}</b><span class="tag navy">${esc(clsName(te.classId))}</span><br>
          <span class="soft" style="font-size:.82rem">${t('Username','Usuario')}: ${esc(te.username)}</span>
        </div>
        <button class="mini-btn danger" onclick="delUser('${te.id}')">${t('Remove','Eliminar')}</button>
      </div>`).join('')
      : `<div class="empty">${t('No teachers yet.','Aun no hay maestros.')}</div>`;
  }

  /* --- parents --- */
  if (SUB === 'parents') {
    const ps = DB.users.filter(u => u.role === 'parent');
    h += ps.length ? ps.map(p => {
      const linked = parentChildren(p).map(c => c.id);
      return `<div class="list-item" style="align-items:flex-start">
        <div class="grow">
          <b>${esc(p.name)}</b> <span class="soft" style="font-size:.82rem">(${esc(p.username)})</span>
          <div style="margin-top:8px">
            ${DB.children.length
              ? `<div class="check-list">${DB.children.map(c => `<label><input type="checkbox" ${linked.includes(c.id) ? 'checked' : ''} onchange="toggleLink('${p.id}','${c.id}',this.checked)"> ${esc(c.name)} <span class="tag" style="margin-left:auto">${esc(clsName(c.classId))}</span></label>`).join('')}</div>`
              : `<span class="soft" style="font-size:.85rem">${t('Add children first.','Agregue ninos primero.')}</span>`}
          </div>
        </div>
        <button class="mini-btn danger" onclick="delUser('${p.id}')">${t('Remove','Eliminar')}</button>
      </div>`;
    }).join('')
      : `<div class="empty">${t('No parent accounts yet.','Aun no hay cuentas de padres.')}</div>`;
  }

  /* --- reports --- */
  if (SUB === 'reports') {
    h += `<div class="card"><div class="field"><label>${t('Filter by Date','Filtrar por Fecha')}</label><input type="date" id="ar-date" value="${window.__arDate || today()}" onchange="window.__arDate=this.value;renderPortal()"></div></div>`;
    const d = window.__arDate || today();
    const rs = DB.reports.filter(r => r.date === d);
    h += rs.length ? rs.map(r => reportCard(r, true)).join('')
      : `<div class="empty">${t('No reports for','No hay reportes para')} ${fmtDate(d)}.</div>`;
  }

  /* --- messages --- */
  if (SUB === 'messages') {
    const allMsgs = DB.messages.slice().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    h += `<div class="card">
      <p class="lead">${t('Send a Message','Enviar Mensaje')}</p>
      <div class="field"><label>${t('To','Para')}</label><select id="am-to">${DB.users.filter(u => u.id !== CU.id).map(u => `<option value="${u.id}">${esc(u.name)} (${roleLabel(u.role)})</option>`).join('')}</select></div>
      <div class="field"><label>${t('About (child)','Sobre (nino)')} ${t('optional','opcional')}</label><select id="am-child"><option value="">${t('General','General')}</option>${DB.children.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join('')}</select></div>
      <div class="field"><label>${t('Message','Mensaje')}</label><textarea id="am-text" placeholder="${t('Type your message...','Escriba su mensaje...')}"></textarea></div>
      <button class="btn btn-teal" onclick="adminSendMsg()">${t('Send','Enviar')}</button>
      <div class="form-msg" id="am-msg"></div>
    </div>`;
    h += allMsgs.length ? allMsgs.map(m => msgCard(m, true)).join('')
      : `<div class="empty">${t('No messages yet.','Aun no hay mensajes.')}</div>`;
  }

  /* --- curriculum --- */
  if (SUB === 'curriculum') {
    if (typeof curriculumPortalView === 'function') {
      h += curriculumPortalView();
    } else {
      h += `<div class="empty">${t('Curriculum system loading...','Cargando el Currículo...')}</div>`;
    }
  }

  /* --- new API modules --- */
  if (SUB === 'incidents')     { h += typeof incidentsView    === 'function' ? incidentsView()    : loadingCard(); }
  if (SUB === 'medications')   { h += typeof medicationsView  === 'function' ? medicationsView()  : loadingCard(); }
  if (SUB === 'attendance')    { h += typeof attendanceView   === 'function' ? attendanceView()   : loadingCard(); }
  if (SUB === 'calendar')      { h += typeof calendarView     === 'function' ? calendarView()     : loadingCard(); }
  if (SUB === 'notifications') { h += typeof notificationsView=== 'function' ? notificationsView(): loadingCard(); }

  return h;
}

/* ===================== TEACHER ===================== */
function teacherView() {
  let h = `<p class="soft" style="margin-bottom:2px">${t('Classroom:','Salon:')} <b style="color:var(--night)">${esc(clsName(CU.classId))}</b></p>`;
  h += subtabs([
    ['class',        '&#127979; ' + t('My Class','Mi Salon')],
    ['report',       '&#128221; ' + t('Daily Report','Reporte Diario')],
    ['history',      '&#128193; ' + t('History','Historial')],
    ['messages',     '&#128172; ' + t('Messages','Mensajes')],
    ['curriculum',   '&#127963; ' + t('Curriculum','Curriculo')],
    ['incidents',    '&#128680; ' + t('Incidents','Incidentes')],
    ['medications',  '&#128138; ' + t('Medications','Medicamentos')],
    ['attendance',   '&#9989; '   + t('Attendance','Asistencia')],
    ['calendar',     '&#128197; ' + t('Calendar','Calendario')],
    ['notifications','&#128276; ' + t('Notifications','Notificaciones') + (_NOTIF_UNREAD ? ` <span style="background:var(--coral);color:#fff;border-radius:999px;font-size:.65rem;padding:1px 7px;margin-left:2px">${_NOTIF_UNREAD}</span>` : '')]
  ]);
  const kids = DB.children.filter(c => c.classId === CU.classId);

  /* class */
  if (SUB === 'class') {
    const td = today();
    /* ── Curriculum Dashboard Widget ── */
    if (typeof getAgeKey === 'function') {
      const _ak  = getAgeKey(CU.classId);
      const _ai  = (typeof CURR_AGE_INFO !== 'undefined' ? CURR_AGE_INFO[_ak] : null) || { color:'#C4DDFF', icon:'&#128218;', label:'Class', range:'' };
      const _th  = typeof getWeekTheme === 'function' ? getWeekTheme(CU.classId) : t('Today','Hoy');
      const _pl  = typeof getPlan === 'function' ? getPlan(CU.classId, td) : null;
      const _tot = _pl ? (_pl.activities || []).length : 0;
      const _don = _pl ? (_pl.activities || []).filter(a => a.status === 'completed').length : 0;
      const _pct = _tot ? Math.round((_don / _tot) * 100) : 0;
      h += `<div style="background:${_ai.color};border-radius:14px;padding:13px 16px;margin-bottom:14px;cursor:pointer" onclick="SUB='curriculum';CURR_SUB='today';renderPortal()">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <span style="font-size:1.4rem">${_ai.icon}</span>
          <div style="flex:1;min-width:0">
            <b style="color:var(--night)">&#127808; ${esc(_th)}</b>
            <p style="font-size:.82rem;color:var(--ink);margin:3px 0 0">${esc(_ai.label)} &middot; ${esc(_ai.range)}</p>
          </div>
          ${_tot ? `<div style="text-align:center;min-width:44px"><div style="font-size:1.5rem;font-weight:800;color:var(--night);line-height:1">${_pct}%</div><div style="font-size:.7rem;color:var(--ink)">${t('done','listo')}</div></div>` : ''}
          <button class="mini-btn in" style="white-space:nowrap" onclick="event.stopPropagation();SUB='curriculum';CURR_SUB='today';renderPortal()">&#127963; ${t('Curriculum','Curriculo')}</button>
        </div>
        ${_tot ? `<div style="margin-top:10px">
          <div style="display:flex;justify-content:space-between;font-size:.75rem;color:var(--ink);margin-bottom:4px">
            <span>${_don} ${t('activities completed','actividades completadas')}</span><span>${_tot - _don} ${t('remaining','restantes')}</span>
          </div>
          <div style="background:rgba(0,0,0,.15);border-radius:999px;height:8px;overflow:hidden">
            <div style="background:var(--night);width:${_pct}%;height:100%;border-radius:999px;transition:width .5s"></div>
          </div>
        </div>` : `<p style="font-size:.78rem;color:var(--ink);margin:8px 0 0">&#128197; ${t("Tap to open today's lesson plan","Toque para ver el plan de hoy")}</p>`}
      </div>`;
    }
    if (EDIT_CHILD_ID && kids.some(k => k.id === EDIT_CHILD_ID)) {
      const ec = DB.children.find(x => x.id === EDIT_CHILD_ID);
      if (ec) h += childEditForm(ec, false);
    }
    h += kids.length ? kids.map(c => {
      const r = getReport(c.id, td);
      const isEditing = EDIT_CHILD_ID === c.id;
      return `<div class="list-item" style="${isEditing ? 'border:2px solid var(--teal)' : ''}">
        <div class="grow">
          <b style="cursor:pointer" onclick="editChild('${c.id}')">${esc(c.name)}</b><span class="tag">${childAge(c.dob)}</span>
          ${c.allergies ? `<span class="tag coral">&#9888; ${esc(c.allergies)}</span>` : ''}
          <br>
          ${c.food ? `<span class="soft" style="font-size:.78rem">&#127860; ${esc(c.food)}</span><br>` : ''}
          <span class="soft" style="font-size:.82rem">
            ${r && r.checkIn ? '&#9989; ' + t('In','Entro') + ' ' + esc(r.checkIn) : '&#9634; ' + t('Not checked in','Sin entrada')}
            ${r && r.checkOut ? ' &middot; &#127968; ' + t('Out','Salio') + ' ' + esc(r.checkOut) : ''}
          </span>
        </div>
        <button class="mini-btn ghost" onclick="editChild('${c.id}')">&#9998; ${t('Edit','Editar')}</button>
        ${!(r && r.checkIn) ? `<button class="mini-btn in" onclick="quickCheck('${c.id}','in')">${t('Check In','Entrada')}</button>` : ''}
        ${(r && r.checkIn && !r.checkOut) ? `<button class="mini-btn out" onclick="quickCheck('${c.id}','out')">${t('Check Out','Salida')}</button>` : ''}
        <button class="mini-btn ghost" onclick="SUB='report';window.__repChild='${c.id}';renderPortal()">${t('Report','Reporte')}</button>
      </div>`;
    }).join('')
      : `<div class="empty">${t('No children in your classroom yet.','Aun no hay ninos en su salon.')}</div>`;
  }

  /* report */
  if (SUB === 'report') {
    if (!kids.length) { h += `<div class="empty">${t('No children in your classroom yet.','Aun no hay ninos.')}</div>`; return h; }
    const selId = window.__repChild && kids.some(k => k.id === window.__repChild) ? window.__repChild : kids[0].id;
    window.__repChild = selId;
    const d = window.__repDate || today();
    const ex = getReport(selId, d) || {};
    if (!FORM_MOOD) FORM_MOOD = ex.mood || '';
    const moods = [['happy','&#128522;',t('Happy','Feliz')],['energetic','&#129321;',t('Energetic','Energico')],['calm','&#128528;',t('Calm','Tranquilo')],['tired','&#128564;',t('Tired','Cansado')],['upset','&#128546;',t('Upset','Triste')]];
    h += `<div class="card">
      <div class="field"><label>${t('Child','Nino')}</label><select id="rp-child" onchange="window.__repChild=this.value;FORM_MOOD='';renderPortal()">${kids.map(k => `<option value="${k.id}" ${k.id === selId ? 'selected' : ''}>${esc(k.name)}</option>`).join('')}</select></div>
      <div class="field"><label>${t('Date','Fecha')}</label><input type="date" id="rp-date" value="${d}" onchange="window.__repDate=this.value;FORM_MOOD='';renderPortal()"></div>
      <div class="rc-grid">
        <div class="field" style="margin:0"><label>${t('Arrived','Llegada')}</label><input type="time" id="rp-in" value="${esc(ex.checkIn || '')}"></div>
        <div class="field" style="margin:0"><label>${t('Picked Up','Salida')}</label><input type="time" id="rp-out" value="${esc(ex.checkOut || '')}"></div>
      </div>
      <div class="field" style="margin-top:14px"><label>${t('Mood','Estado de Animo')}</label>
        <div class="mood-row">${moods.map(m => `<button class="mood-btn ${FORM_MOOD === m[0] ? 'sel' : ''}" onclick="FORM_MOOD='${m[0]}';renderPortal()">${m[1]}<small>${m[2]}</small></button>`).join('')}</div>
      </div>
      <div class="field"><label>${t('Meals','Comidas')}</label><input id="rp-meals" value="${esc(ex.meals || '')}" placeholder="${t('Ate all of lunch...','Comio todo el almuerzo...')}"></div>
      <div class="field"><label>${t('Nap','Siesta')}</label><input id="rp-nap" value="${esc(ex.nap || '')}" placeholder="${t('e.g. 1:00 - 2:30 PM','Ej.: 1:00 - 2:30 PM')}"></div>
      <div class="field"><label>${t("Today's Activities","Actividades de Hoy")}</label><textarea id="rp-act" placeholder="${t('What did the child do today?','Que hizo el nino hoy?')}">${esc(ex.activities || '')}</textarea></div>
      <div class="field"><label>${t('Message to Parent','Mensaje para los Padres')}</label><textarea id="rp-note">${esc(ex.note || '')}</textarea></div>
      <button class="btn btn-teal btn-full" onclick="saveReport()">${t('Save Daily Report','Guardar Reporte Diario')}</button>
      <div class="form-msg" id="rp-msg"></div>
    </div>`;
    /* ── Curriculum Activity Auto-Populate ── */
    if (typeof getPlan === 'function') {
      const _cp  = getPlan(CU.classId, d);
      const _cak = typeof getAgeKey === 'function' ? getAgeKey(CU.classId) : 'preschool';
      const _ca  = _cp ? (_cp.activities || []).filter(a => a.status === 'completed' || a.status === 'partial') : [];
      if (_ca.length) {
        const _lines = _ca.map(entry => {
          const pool = (typeof ACTIVITY_LIBRARY !== 'undefined' ? (ACTIVITY_LIBRARY[_cak] || {})[entry.catId] : null) || [];
          const act  = pool.find(a => a.id === entry.activityId);
          if (!act) return null;
          return `[${entry.status === 'completed' ? t('Completed','Completado') : t('Partial','Parcial')}] ${act.title}${entry.notes ? ' \u2014 ' + entry.notes : ''}`;
        }).filter(Boolean);
        if (_lines.length) {
          h += `<div class="card" style="margin-top:10px;border-left:5px solid var(--teal)">
            <p class="lead" style="margin-bottom:5px">&#9989; ${t("Today's Curriculum Activities","Actividades de Curriculo Hoy")}</p>
            <p style="font-size:.82rem;color:var(--muted);margin:0 0 8px">${t('Marked complete in the Curriculum tab. Click to copy into the report.','Marcadas completas en el Curriculo. Toque para copiar al reporte.')}</p>
            <ul style="margin:0 0 10px 16px;padding:0">${_lines.map(ln => `<li style="font-size:.83rem;margin-bottom:3px">${esc(ln)}</li>`).join('')}</ul>
            <button class="mini-btn in" onclick="_fillReportActivities(${JSON.stringify(_lines.join('\n'))})">&#128203; ${t('Copy to Activities Field','Copiar a Actividades')}</button>
          </div>`;
        }
      }
    }
  }

  /* history */
  if (SUB === 'history') {
    const ids = kids.map(k => k.id);
    const rs = DB.reports.filter(r => ids.includes(r.childId)).sort((a, b) => b.date.localeCompare(a.date));
    h += rs.length ? rs.map(r => reportCard(r, true)).join('')
      : `<div class="empty">${t('No reports yet.','Aun no hay reportes.')}</div>`;
  }

  /* messages */
  if (SUB === 'messages') {
    const parentIds = [...new Set(kids.flatMap(k => k.parentIds || []))];
    h += `<div class="card">
      <p class="lead">${t('Send a Message','Enviar Mensaje')}</p>
      ${parentIds.length ? `
        <div class="field"><label>${t('To (Parent)','Para (Padre/Madre)')}</label><select id="tm-to">${parentIds.map(id => { const p = userById(id); return p ? `<option value="${p.id}">${esc(p.name)}</option>` : ''; }).join('')}</select></div>
        <div class="field"><label>${t('About (child)','Sobre (nino)')}</label><select id="tm-child">${kids.map(k => `<option value="${k.id}">${esc(k.name)}</option>`).join('')}</select></div>
        <div class="field"><label>${t('Message','Mensaje')}</label><textarea id="tm-text" placeholder="${t('Type your message...','Escriba su mensaje...')}"></textarea></div>
        <button class="btn btn-teal" onclick="teacherSendMsg()">${t('Send','Enviar')}</button>
        <div class="form-msg" id="tm-msg"></div>
      ` : `<p class="soft">${t('No parents linked to your students yet.','Aun no hay padres vinculados a sus alumnos.')}</p>`}
    </div>`;
    const myMsgs = DB.messages.filter(m => m.fromId === CU.id || m.toId === CU.id).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    // mark as read
    myMsgs.filter(m => m.toId === CU.id && !m.read).forEach(m => { m.read = true; });
    saveDB();
    h += myMsgs.length ? myMsgs.map(m => msgCard(m, false)).join('')
      : `<div class="empty">${t('No messages yet.','Aun no hay mensajes.')}</div>`;
  }

  /* curriculum */
  if (SUB === 'curriculum') {
    // reset if CURR_SUB is stuck on an admin-only tab key
    const _adminOnlyTabs = ['overview','themes','analytics','analytics2','pbl_admin'];
    if (typeof CURR_SUB !== 'undefined' && _adminOnlyTabs.includes(CURR_SUB)) CURR_SUB = 'today';
    if (typeof curriculumPortalView === 'function') {
      h += curriculumPortalView();
    } else {
      h += `<div class="empty">${t('Curriculum system loading...','Cargando Curriculo...')}</div>`;
    }
  }

  /* new API modules */
  if (SUB === 'incidents')     { h += typeof incidentsView    === 'function' ? incidentsView()    : loadingCard(); }
  if (SUB === 'medications')   { h += typeof medicationsView  === 'function' ? medicationsView()  : loadingCard(); }
  if (SUB === 'attendance')    { h += typeof attendanceView   === 'function' ? attendanceView()   : loadingCard(); }
  if (SUB === 'calendar')      { h += typeof calendarView     === 'function' ? calendarView()     : loadingCard(); }
  if (SUB === 'notifications') { h += typeof notificationsView=== 'function' ? notificationsView(): loadingCard(); }

  return h;
}

function _fillReportActivities(text) {
  const el = document.getElementById('rp-act');
  if (el) { el.value = text; el.focus(); }
}

/* ===================== PARENT ===================== */
function parentView() {
  const kids = parentChildren(CU);
  let h = subtabs([
    ['children',     '&#128118; ' + t('My Children','Mis Hijos')],
    ['reports',      '&#128203; ' + t('Daily Reports','Reportes Diarios')],
    ['messages',     '&#128172; ' + t('Messages','Mensajes')],
    ['curriculum',   '&#127963; ' + t('Learning','Aprendizaje')],
    ['incidents',    '&#128680; ' + t('Incidents','Incidentes')],
    ['medications',  '&#128138; ' + t('Medications','Medicamentos')],
    ['attendance',   '&#9989; '   + t('Attendance','Asistencia')],
    ['calendar',     '&#128197; ' + t('Calendar','Calendario')],
    ['notifications','&#128276; ' + t('Notifications','Notificaciones') + (_NOTIF_UNREAD ? ` <span style="background:var(--coral);color:#fff;border-radius:999px;font-size:.65rem;padding:1px 7px;margin-left:2px">${_NOTIF_UNREAD}</span>` : '')]
  ]);

  if (!kids.length && SUB !== 'messages') {
    h += `<div class="empty">
      ${t('Your account is not linked to a child yet.','Su cuenta aun no esta vinculada a un nino.')}<br>
      ${t('Please contact Mini Star Childcare:','Por favor contacte a Mini Star:')} <a href="tel:+12062554000" style="color:var(--gold)">(206) 255-4000</a>
    </div>`;
    return h;
  }

  /* my children */
  if (SUB === 'children') {
    const td = today();
    h += kids.map(c => {
      const r = getReport(c.id, td);
      const ageStr = childAge(c.dob);
      return `<div class="child-card">
        <div class="child-header">
          <div class="child-avatar">${esc(c.name[0])}</div>
          <div>
            <b style="color:var(--night);font-size:1.1rem">${esc(c.name)}</b><br>
            <span class="tag">${esc(clsName(c.classId))}</span>
            ${ageStr ? `<span class="tag navy">${ageStr}</span>` : ''}
          </div>
        </div>
        <div class="child-detail-row">
          ${c.allergies ? `<span class="detail-chip allergy">&#9888; ${esc(c.allergies)}</span>` : ''}
          ${c.food ? `<span class="detail-chip">&#127860; ${esc(c.food)}</span>` : ''}
          ${c.emergencyContact ? `<span class="detail-chip">&#128222; ${esc(c.emergencyContact)}${c.emergencyPhone ? ' ' + esc(c.emergencyPhone) : ''}</span>` : ''}
          ${c.notes ? `<span class="detail-chip">&#128221; ${esc(c.notes)}</span>` : ''}
        </div>
        <div style="margin-top:10px">
          <span class="soft" style="font-size:.85rem">
            ${t('Today:','Hoy:')}
            ${r && r.checkIn ? '&#9989; ' + t('Arrived','Llego') + ' ' + esc(r.checkIn) : t('No check-in yet','Aun sin entrada')}
            ${r && r.checkOut ? ' &middot; &#127968; ' + t('Picked up','Salio') + ' ' + esc(r.checkOut) : ''}
          </span>
        </div>
        ${r && r.mood ? `<div style="margin-top:8px;font-size:1.4rem">${moodEmoji(r.mood)}</div>` : ''}
      </div>`;
    }).join('');
  }

  /* reports */
  if (SUB === 'reports') {
    if (kids.length > 1) {
      const sel = PARENT_CHILD && kids.some(k => k.id === PARENT_CHILD) ? PARENT_CHILD : kids[0].id;
      PARENT_CHILD = sel;
      h += `<div class="subtabs" style="padding-top:0">${kids.map(k => `<button class="${k.id === sel ? 'active' : ''}" onclick="PARENT_CHILD='${k.id}';renderPortal()">${esc(k.name)}</button>`).join('')}</div>`;
      const rs = DB.reports.filter(r => r.childId === sel).sort((a, b) => b.date.localeCompare(a.date));
      h += rs.length ? rs.map(r => reportCard(r, false)).join('')
        : `<div class="empty">${t('No reports yet.','Aun no hay reportes.')}</div>`;
    } else if (kids.length === 1) {
      const rs = DB.reports.filter(r => r.childId === kids[0].id).sort((a, b) => b.date.localeCompare(a.date));
      h += rs.length ? rs.map(r => reportCard(r, false)).join('')
        : `<div class="empty">${t('No reports yet for your child.','Aun no hay reportes para su hijo.')}</div>`;
    }
  }

  /* messages */
  if (SUB === 'messages') {
    const teacherIds = [...new Set(kids.flatMap(k => {
      const cls = DB.classes.find(c => c.id === k.classId);
      return DB.users.filter(u => u.role === 'teacher' && u.classId === k.classId).map(u => u.id);
    }))];
    h += `<div class="card">
      <p class="lead">${t('Send a Message','Enviar Mensaje')}</p>
      ${teacherIds.length ? `
        <div class="field"><label>${t('To (Teacher)','Para (Maestro/a)')}</label><select id="pm-to">${teacherIds.map(id => { const te = userById(id); return te ? `<option value="${te.id}">${esc(te.name)}</option>` : ''; }).join('')}</select></div>
        ${kids.length > 1 ? `<div class="field"><label>${t('About (child)','Sobre (nino)')}</label><select id="pm-child">${kids.map(k => `<option value="${k.id}">${esc(k.name)}</option>`).join('')}</select></div>` : `<input type="hidden" id="pm-child" value="${kids.length ? kids[0].id : ''}">`}
        <div class="field"><label>${t('Message','Mensaje')}</label><textarea id="pm-text" placeholder="${t('Type your message...','Escriba su mensaje...')}"></textarea></div>
        <button class="btn btn-teal" onclick="parentSendMsg()">${t('Send','Enviar')}</button>
        <div class="form-msg" id="pm-msg"></div>
      ` : `<p class="soft">${t('No teachers linked to your children yet.','Aun no hay maestros para sus hijos.')}</p>`}
    </div>`;
    const myMsgs = DB.messages.filter(m => m.fromId === CU.id || m.toId === CU.id).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    myMsgs.filter(m => m.toId === CU.id && !m.read).forEach(m => { m.read = true; });
    saveDB();
    h += myMsgs.length ? myMsgs.map(m => msgCard(m, false)).join('')
      : `<div class="empty">${t('No messages yet.','Aun no hay mensajes.')}</div>`;
  }

  /* curriculum / learning */
  if (SUB === 'curriculum') {
    if (typeof curriculumPortalView === 'function') {
      h += curriculumPortalView();
    } else {
      h += `<div class="empty">${t('Learning system loading...','Cargando el Sistema de Aprendizaje...')}</div>`;
    }
  }

  /* new API modules */
  if (SUB === 'incidents')     { h += typeof incidentsView    === 'function' ? incidentsView()    : loadingCard(); }
  if (SUB === 'medications')   { h += typeof medicationsView  === 'function' ? medicationsView()  : loadingCard(); }
  if (SUB === 'attendance')    { h += typeof attendanceView   === 'function' ? attendanceView()   : loadingCard(); }
  if (SUB === 'calendar')      { h += typeof calendarView     === 'function' ? calendarView()     : loadingCard(); }
  if (SUB === 'notifications') { h += typeof notificationsView=== 'function' ? notificationsView(): loadingCard(); }

  return h;
}

/* ===================== SHARED HELPERS ===================== */
function getReport(childId, date) { return DB.reports.find(r => r.childId === childId && r.date === date); }
function moodEmoji(m) { return ({happy:'&#128522;',energetic:'&#129321;',calm:'&#128528;',tired:'&#128564;',upset:'&#128546;'})[m] || ''; }

function childListItem(c, isAdmin) {
  const pNames = (c.parentIds || []).map(id => { const p = userById(id); return p ? esc(p.name) : ''; }).filter(Boolean).join(', ');
  const isEditing = EDIT_CHILD_ID === c.id;
  return `<div class="list-item" style="${isEditing ? 'border:2px solid var(--teal)' : ''}">
    <div class="child-avatar" style="width:42px;height:42px;font-size:1.1rem;flex-shrink:0">${esc(c.name[0])}</div>
    <div class="grow">
      <b style="cursor:pointer;color:var(--night)" onclick="editChild('${c.id}')">${esc(c.name)}</b>
      <span class="tag">${esc(clsName(c.classId))}</span>
      ${c.allergies ? `<span class="tag coral">&#9888; ${esc(c.allergies)}</span>` : ''}
      <br>
      <span class="soft" style="font-size:.82rem">${childAge(c.dob)} &middot; ${t('Parents:','Padres:')} ${pNames || '-'}</span>
      ${c.food ? `<br><span class="soft" style="font-size:.78rem">&#127860; ${esc(c.food)}</span>` : ''}
      ${c.notes ? `<br><span class="soft" style="font-size:.78rem">&#128221; ${esc(c.notes)}</span>` : ''}
    </div>
    <button class="mini-btn ghost" onclick="editChild('${c.id}')">&#9998; ${t('Edit','Editar')}</button>
    ${isAdmin ? `<button class="mini-btn danger" onclick="delChild('${c.id}')">${t('Remove','Eliminar')}</button>` : ''}
  </div>`;
}

function reportCard(r, showChild) {
  const ch = childById(r.childId), te = userById(r.teacherId);
  return `<div class="report-card">
    <div class="rc-head">
      <b>${showChild && ch ? esc(ch.name) + ' &middot; ' : ''}${fmtDate(r.date)}</b>
      <span style="font-size:1.5rem">${moodEmoji(r.mood)}</span>
    </div>
    <div class="rc-grid">
      <div class="rc-cell"><b>${t('Arrived','Llegada')}</b>${esc(r.checkIn) || '-'}</div>
      <div class="rc-cell"><b>${t('Picked Up','Salida')}</b>${esc(r.checkOut) || '-'}</div>
      <div class="rc-cell"><b>${t('Meals','Comidas')}</b>${esc(r.meals) || '-'}</div>
      <div class="rc-cell"><b>${t('Nap','Siesta')}</b>${esc(r.nap) || '-'}</div>
    </div>
    ${r.activities ? `<div class="rc-note"><b>${t("Today's Activities",'Actividades')}</b>${esc(r.activities)}</div>` : ''}
    ${r.note ? `<div class="rc-note"><b>${t('Message from Teacher','Mensaje del Maestro')}</b>${esc(r.note)}</div>` : ''}
    ${te ? `<p class="soft" style="font-size:.8rem;margin:8px 0 0">${t('Reported by','Reportado por')} ${esc(te.name)}</p>` : ''}
  </div>`;
}

function msgCard(m, isAdmin) {
  const fromUser = userById(m.fromId);
  const toUser = userById(m.toId);
  const child = m.childId ? childById(m.childId) : null;
  const isMe = m.fromId === CU.id;
  return `<div class="msg-card ${isMe ? 'from-me' : 'from-other'}">
    <div class="msg-meta">
      <span class="name">${fromUser ? esc(fromUser.name) : '?'}</span>
      <span>&#8594; ${toUser ? esc(toUser.name) : '?'}</span>
      ${child ? `<span class="tag">${esc(child.name)}</span>` : ''}
      ${!m.read && !isMe ? `<span class="unread-dot"></span>` : ''}
      <span style="margin-left:auto">${m.date} ${m.time}</span>
    </div>
    <div class="msg-text">${esc(m.text)}</div>
  </div>`;
}

/* ===================== CHILD EDIT FORM ===================== */
function editChild(id) { EDIT_CHILD_ID = id; renderPortal(); }
function cancelEditChild() { EDIT_CHILD_ID = null; renderPortal(); }

function childEditTeacherHtml(classId) {
  const teachers = DB.users.filter(u => u.role === 'teacher');
  // find teacher currently assigned to this classroom
  const currentTeacher = teachers.find(te => te.classId === classId);
  return `<select id="ec-teacher" style="width:100%;border:2px solid #EAE2DA;border-radius:14px;padding:11px 14px;font-family:'Nunito',sans-serif;font-size:1rem;background:#FFFDFB">
    <option value="">${t('No specific teacher','Sin maestro especifico')}</option>
    ${teachers.map(te => `<option value="${te.id}" ${te.id === (currentTeacher && currentTeacher.id) ? 'selected' : ''}>${esc(te.name)} — ${esc(clsName(te.classId))}</option>`).join('')}
  </select>`;
}

function onEditClassChange(newClassId) {
  // auto-pick teacher of that classroom if one exists
  const wrap = document.getElementById('ec-teacher-wrap');
  if (!wrap) return;
  wrap.innerHTML = childEditTeacherHtml(newClassId);
}

function childEditForm(c, isAdmin) {
  const allTeachers = DB.users.filter(u => u.role === 'teacher');
  const currentTeacher = allTeachers.find(te => te.classId === c.classId);
  const parents = DB.users.filter(u => u.role === 'parent');
  return `<div class="card" style="border-left:5px solid var(--teal);margin-bottom:18px">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:16px">
      <p class="lead" style="margin:0">&#9998; ${t('Editing:','Editando:')} <span style="color:var(--teal)">${esc(c.name)}</span></p>
      <button class="mini-btn ghost" onclick="cancelEditChild()">&#10005; ${t('Cancel','Cancelar')}</button>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="field" style="margin:0"><label>${t("Child's Name *","Nombre del Nino *")}</label><input id="ec-name" value="${esc(c.name)}"></div>
      <div class="field" style="margin:0"><label>${t('Date of Birth','Fecha de Nacimiento')}</label><input type="date" id="ec-dob" value="${esc(c.dob || '')}"></div>
    </div>

    ${isAdmin ? `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
      <div class="field" style="margin:0">
        <label>${t('Classroom','Salon')}</label>
        <select id="ec-class" onchange="onEditClassChange(this.value)" style="width:100%;border:2px solid #EAE2DA;border-radius:14px;padding:11px 14px;font-family:'Nunito',sans-serif;font-size:1rem;background:#FFFDFB">
          ${DB.classes.map(cl => `<option value="${cl.id}" ${cl.id === c.classId ? 'selected' : ''}>${esc(LANG==='es'?(CLS_ES[cl.name]||cl.name):cl.name)}</option>`).join('')}
        </select>
      </div>
      <div class="field" style="margin:0">
        <label>${t('Assign Teacher','Asignar Maestro')}</label>
        <div id="ec-teacher-wrap">${childEditTeacherHtml(c.classId)}</div>
      </div>
    </div>
    <div class="field" style="margin-top:12px">
      <label>${t('Linked Parents','Padres Vinculados')}</label>
      <div style="display:flex;flex-direction:column;gap:6px;background:var(--cream);border-radius:14px;padding:10px 12px;border:2px solid #EAE2DA">
        ${parents.map(p => {
          const checked = (c.parentIds||[]).includes(p.id);
          return `<label style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;background:${checked?'#DCEFE9':'#fff'};border:2px solid ${checked?'var(--teal)':'#EAE2DA'};cursor:pointer;transition:.15s" onclick="toggleEcParent(this,'${p.id}','${c.id}')">
            <input type="checkbox" class="ec-parent" value="${p.id}" ${checked?'checked':''} style="width:18px;height:18px;accent-color:var(--teal);flex-shrink:0">
            <div>
              <div style="font-weight:800;color:var(--night);font-size:.95rem">${esc(p.name)}</div>
              <div style="font-size:.76rem;color:var(--muted)">@${esc(p.username)}${p.phone?'  &middot;  '+esc(p.phone):''}</div>
            </div>
          </label>`;
        }).join('')}
        ${parents.length === 0 ? `<p class="soft" style="font-size:.85rem;margin:0">${t('No parent accounts yet.','Aun no hay cuentas de padres.')}</p>` : ''}
      </div>
    </div>` : `<input type="hidden" id="ec-class" value="${esc(c.classId)}">`}

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
      <div class="field" style="margin:0"><label>${t('Allergies','Alergias')}</label><input id="ec-allergy" value="${esc(c.allergies||'')}" placeholder="${t('e.g. Peanuts','Ej.: Cacahuates')}"></div>
      <div class="field" style="margin:0"><label>${t('Food / Dietary Needs','Comida / Dieta')}</label><input id="ec-food" value="${esc(c.food||'')}" placeholder="${t('e.g. Halal only','Ej.: Solo halal')}"></div>
    </div>
    <div class="field" style="margin-top:12px"><label>${t('Medical Conditions / Notes','Condiciones Medicas / Notas')}</label><textarea id="ec-notes" style="min-height:60px">${esc(c.notes||'')}</textarea></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="field" style="margin:0"><label>${t('Emergency Contact Name','Contacto de Emergencia')}</label><input id="ec-ecname" value="${esc(c.emergencyContact||'')}"></div>
      <div class="field" style="margin:0"><label>${t('Emergency Phone','Telefono de Emergencia')}</label><input id="ec-ecphone" value="${esc(c.emergencyPhone||'')}"></div>
    </div>

    <div style="display:flex;gap:10px;margin-top:6px">
      <button class="btn btn-teal" onclick="saveChildEdit()">&#10003; ${t('Save Changes','Guardar Cambios')}</button>
      <button class="mini-btn ghost" onclick="cancelEditChild()" style="padding:13px 20px">&#10005; ${t('Cancel','Cancelar')}</button>
    </div>
    <div class="form-msg" id="ec-msg"></div>
  </div>`;
}

/* ===================== ENROLLMENT PAGE ===================== */
function renderEnrollment() {
  const root = document.getElementById('enrollment-root');
  if (!root) return;
  root.innerHTML = enrollmentView();
}

function enrollmentView() {
  // If logged in as admin or teacher, show message
  if (CU && (CU.role === 'admin' || CU.role === 'teacher')) {
    return `<div class="card t-teal">
      <p class="lead">${t('You are logged in as','Usted esta conectado como')} ${esc(CU.name)}.</p>
      <p>${t('To manage enrollments, go to your portal.','Para gestionar inscripciones, vaya a su portal.')}</p>
      <button class="btn btn-night" onclick="goTo('portal')">${t('Go to Portal','Ir al Portal')}</button>
    </div>`;
  }

  // If logged in as parent
  if (CU && CU.role === 'parent') {
    const myEnrollments = DB.enrollments.filter(e => e.parentId === CU.id);
    let h = `<div class="card t-teal" style="margin-bottom:18px">
      <p class="lead">&#128075; ${t('Welcome back,','Bienvenido/a,')} ${esc(CU.name)}!</p>
      <p style="margin-bottom:0">${t('You can enroll another child below, or view your existing enrollments.','Puede inscribir otro hijo abajo, o ver sus inscripciones existentes.')}</p>
    </div>`;
    if (myEnrollments.length) {
      h += `<p class="lead" style="margin-bottom:10px">${t('Your Enrollment Requests','Sus Solicitudes de Inscripcion')}</p>`;
      h += myEnrollments.map(e => {
        const statusColor = {pending:'var(--gold)',approved:'var(--teal)',rejected:'var(--coral)'}[e.status] || 'var(--muted)';
        const statusLabel = {pending:t('Under Review','En Revision'),approved:t('Approved','Aprobado'),rejected:t('Not Approved','No Aprobado')}[e.status] || e.status;
        return `<div class="list-item">
          <div class="grow">
            <b>${esc(e.childInfo.name)}</b>
            <span class="tag" style="background:${statusColor}20;color:${statusColor}">${statusLabel}</span><br>
            <span class="soft" style="font-size:.82rem">${t('Submitted:','Enviado:')} ${fmtDate(e.submittedDate)}</span>
            ${e.status === 'approved' ? `<br><span class="soft" style="font-size:.82rem;color:var(--teal)">&#9989; ${t('Your child has been enrolled. You can view their info in your portal.','Su hijo fue inscrito. Puede verlo en su portal.')}</span>` : ''}
            ${e.status === 'rejected' ? `<br><span class="soft" style="font-size:.82rem;color:var(--coral)">&#128222; ${t('Please call us: (206) 255-4000','Por favor llamenos: (206) 255-4000')}</span>` : ''}
          </div>
          ${e.status === 'approved' ? `<button class="mini-btn ghost" onclick="goTo('portal')">${t('My Portal','Mi Portal')}</button>` : ''}
        </div>`;
      }).join('');
      h += '<hr style="border:none;border-top:1px solid #EAE2DA;margin:24px 0">';
    }
    h += enrollmentForm(true);
    return h;
  }

  // Not logged in — show intro + form
  return `
  <p style="margin-bottom:20px">${t('Fill out the form below to enroll your child. Your account will be created automatically so you can log in and track your child\'s progress.','Complete el formulario a continuacion para inscribir a su hijo. Su cuenta se creara automaticamente para que pueda iniciar sesion y seguir el progreso de su hijo.')}</p>
  ${enrollmentForm(false)}`;
}

function enrollmentForm(isLoggedIn) {
  const suggestClass = (dobVal) => {
    if (!dobVal) return '';
    const ageMonths = (Date.now() - new Date(dobVal).getTime()) / (30.44 * 24 * 3600 * 1000);
    if (ageMonths < 12) return DB.classes.find(c => c.name === 'Infants')?.id || '';
    if (ageMonths < 36) return DB.classes.find(c => c.name === 'Toddlers')?.id || '';
    if (ageMonths < 60) return DB.classes.find(c => c.name === 'Preschool')?.id || '';
    return DB.classes.find(c => c.name === 'School-Age')?.id || '';
  };

  let h = '';

  if (!isLoggedIn) {
    h += `
    <div class="card t-night" style="margin-bottom:0;border-radius:var(--radius) var(--radius) 0 0;border-bottom:none">
      <p class="lead">&#128100; ${t('Parent / Guardian Information','Informacion del Padre / Tutor')}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="field" style="margin:0"><label>${t('Full Name *','Nombre Completo *')}</label><input id="ef-pname" placeholder="${t('Maria Gonzalez','Maria Gonzalez')}"></div>
        <div class="field" style="margin:0"><label>${t('Phone Number *','Numero de Telefono *')}</label><input id="ef-phone" type="tel" placeholder="(206) 555-0000"></div>
      </div>
      <div class="field" style="margin-top:12px"><label>${t('Email Address','Correo Electronico')}</label><input id="ef-email" type="email" placeholder="email@example.com"></div>
      <div class="field"><label>${t('Home Address *','Direccion de Casa *')}</label><input id="ef-addr" placeholder="${t('e.g. 123 Main St, SeaTac, WA 98188','Ej.: 123 Main St, SeaTac, WA 98188')}"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:4px">
        <div class="field" style="margin:0"><label>${t('Choose a Username *','Elija un Usuario *')}</label><input id="ef-user" placeholder="mariag"></div>
        <div class="field" style="margin:0"><label>${t('Password * (min 6 chars)','Contrasena * (min 6)')}</label><input id="ef-pass" type="password"></div>
      </div>
    </div>`;
  }

  h += `
  <div class="card t-gold" style="margin-bottom:0;border-radius:${isLoggedIn ? 'var(--radius) var(--radius)' : '0 0'} 0 0;border-bottom:none">
    <p class="lead">&#128118; ${t("Child's Information","Informacion del Nino")}</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="field" style="margin:0"><label>${t("Child's Full Name *","Nombre Completo del Nino *")}</label><input id="ef-cname" placeholder="${t('Emma Johnson','Emma Johnson')}"></div>
      <div class="field" style="margin:0"><label>${t('Date of Birth *','Fecha de Nacimiento *')}</label><input type="date" id="ef-dob" onchange="suggestClassroom(this.value)"></div>
    </div>
    <div class="field" style="margin-top:12px"><label>${t('Preferred Classroom','Salon Preferido')}</label>
      <select id="ef-class">${DB.classes.map(c => `<option value="${c.id}">${LANG === 'es' ? (CLS_ES[c.name] || c.name) : c.name}</option>`).join('')}</select>
      <small class="soft" style="font-size:.78rem">${t('Auto-suggested based on age. You may change it.','Sugerido por edad. Puede cambiarlo.')}</small>
    </div>
  </div>
  <div class="card t-coral" style="margin-bottom:0;border-radius:0;border-bottom:none">
    <p class="lead">&#9888; ${t('Health & Dietary Information','Informacion de Salud y Dieta')}</p>
    <div class="field"><label>${t('Allergies','Alergias')}</label><input id="ef-allergy" placeholder="${t('e.g. Peanuts, Dairy, Eggs (leave blank if none)','Ej.: Cacahuates, Lacteos, Huevos (dejar en blanco si no tiene)')}"></div>
    <div class="field"><label>${t('Food Preferences & Dietary Needs','Preferencias de Comida y Dieta')}</label><textarea id="ef-food" placeholder="${t('e.g. Halal only, vegetarian, no dairy...','Ej.: Solo halal, vegetariano, sin lacteos...')}"></textarea></div>
    <div class="field" style="margin-bottom:0"><label>${t('Medical Conditions / Other Health Notes','Condiciones Medicas / Notas de Salud')}</label><textarea id="ef-medical" placeholder="${t('e.g. Asthma (has inhaler), mild eczema...','Ej.: Asma (tiene inhalador), eczema leve...')}"></textarea></div>
  </div>
  <div class="card" style="margin-bottom:0;border-radius:0">
    <p class="lead">&#128222; ${t('Emergency Contact','Contacto de Emergencia')}</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="field" style="margin:0"><label>${t('Contact Name *','Nombre del Contacto *')}</label><input id="ef-ecname" placeholder="${t('John Smith','Juan Garcia')}"></div>
      <div class="field" style="margin:0"><label>${t('Contact Phone *','Telefono del Contacto *')}</label><input id="ef-ecphone" type="tel" placeholder="(206) 555-0000"></div>
    </div>
    <div class="field" style="margin-top:12px"><label>${t('Desired Start Date','Fecha Deseada de Inicio')}</label><input type="date" id="ef-start"></div>
    <div class="field"><label>${t('Additional Notes for Staff','Notas Adicionales para el Personal')}</label><textarea id="ef-notes" placeholder="${t('Pickup schedule, special routines, other important info...','Horario de recogida, rutinas especiales...')}"></textarea></div>
  </div>
  <div class="card" style="border-radius:0;border-top:none;border-bottom:none;background:#FFF8F4">
    <div style="display:flex;align-items:flex-start;gap:14px">
      <span style="font-size:1.5rem;flex-shrink:0">&#128222;</span>
      <div>
        <p class="lead" style="margin-bottom:6px">${t('Not sure? Contact us first!','No esta seguro? Contactenos primero!')}</p>
        <p style="font-size:.9rem;color:var(--ink);margin-bottom:12px">${t('If you have questions before enrolling, or prefer to speak with someone directly, we are happy to help.','Si tiene preguntas antes de inscribirse, o prefiere hablar con alguien directamente, con mucho gusto le ayudamos.')}</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <a href="tel:+12062554000" class="btn btn-night" style="font-size:.9rem;padding:11px 20px">
            &#128222; ${t('Call Us','Llamenos')} &mdash; (206) 255-4000
          </a>
          <a href="mailto:ministarchildcare14@gmail.com" class="btn btn-gold" style="font-size:.9rem;padding:11px 20px">
            &#9993; ${t('Email Us','Escribanos')}
          </a>
        </div>
        <a href="https://maps.google.com/?q=17735+38th+Ave+South,+SeaTac,+WA+98188" target="_blank" rel="noopener" class="btn btn-teal" style="font-size:.9rem;padding:11px 20px;margin-top:4px;display:inline-block">
          &#128205; ${t('Visit Us — Get Directions','Visítenos — Como Llegar')}
        </a>
        <p style="font-size:.78rem;color:var(--muted);margin-top:10px;margin-bottom:0">
          &#128336; ${t('Open 24 Hours, 7 Days a Week','Abierto 24 Horas, 7 Dias a la Semana')}
          &nbsp;&middot;&nbsp; 17735 38th Ave South, SeaTac, WA 98188
        </p>
      </div>
    </div>
  </div>
  <div class="card t-teal" style="border-radius:0 0 var(--radius) var(--radius);border-top:none">
    <button class="btn btn-night btn-full" style="font-size:1.05rem;padding:15px" onclick="${isLoggedIn ? 'submitEnrollmentExisting()' : 'submitEnrollmentNew()'}">
      &#127775; ${t('Submit Enrollment Request','Enviar Solicitud de Inscripcion')}
    </button>
    <p class="soft" style="font-size:.8rem;margin-top:10px;margin-bottom:0;text-align:center">
      ${t('An admin will review your request and contact you within 1–2 business days.','Un administrador revisara su solicitud y se pondra en contacto en 1-2 dias habiles.')}
    </p>
    <div class="form-msg" id="ef-msg" style="margin-top:12px"></div>
  </div>`;

  return h;
}

function suggestClassroom(dobVal) {
  if (!dobVal) return;
  const ageMonths = (Date.now() - new Date(dobVal).getTime()) / (30.44 * 24 * 3600 * 1000);
  let suggested;
  if (ageMonths < 12) suggested = DB.classes.find(c => c.name === 'Infants');
  else if (ageMonths < 36) suggested = DB.classes.find(c => c.name === 'Toddlers');
  else if (ageMonths < 60) suggested = DB.classes.find(c => c.name === 'Preschool');
  else suggested = DB.classes.find(c => c.name === 'School-Age');
  if (suggested) {
    const el = document.getElementById('ef-class');
    if (el) el.value = suggested.id;
  }
}

function enrollmentCard(e, canAct) {
  const statusColor = {pending:'var(--gold)',approved:'var(--teal)',rejected:'#C03434'}[e.status] || 'var(--muted)';
  const statusLabel = {pending:t('Pending Review','En Revision'),approved:t('Approved','Aprobado'),rejected:t('Rejected','Rechazado')}[e.status] || e.status;
  const c = e.childInfo;
  const p = e.parentInfo;
  return `<div class="card" style="border-left:5px solid ${statusColor};margin-bottom:14px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:12px">
      <div>
        <b style="font-size:1.1rem;color:var(--night)">${esc(c.name)}</b>
        <span class="tag" style="background:${statusColor}20;color:${statusColor};margin-left:6px">${statusLabel}</span>
        <br><span class="soft" style="font-size:.8rem">${t('Submitted:','Enviado:')} ${fmtDate(e.submittedDate)}</span>
      </div>
      ${canAct ? `<div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start">
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
          <div>
            <div style="font-size:.72rem;font-weight:800;color:var(--muted);text-transform:uppercase;margin-bottom:3px">${t('Classroom','Salon')}</div>
            <select id="approve-cls-${e.id}" onchange="onApproveClassChange('${e.id}',this.value)" style="border:2px solid #EAE2DA;border-radius:10px;padding:7px 10px;font-family:'Nunito',sans-serif;font-size:.88rem">
              ${DB.classes.map(cl => `<option value="${cl.id}" ${cl.id === c.classPreference ? 'selected' : ''}>${LANG==='es'?(CLS_ES[cl.name]||cl.name):cl.name}</option>`).join('')}
            </select>
          </div>
          <div id="teacher-select-${e.id}">
            <div style="font-size:.72rem;font-weight:800;color:var(--muted);text-transform:uppercase;margin-bottom:3px">${t('Assign Teacher','Asignar Maestro')}</div>
            ${teacherSelectHtml(e.id, c.classPreference)}
          </div>
          <div style="align-self:flex-end">
            <button class="mini-btn success" onclick="approveEnrollment('${e.id}')">&#9989; ${t('Approve','Aprobar')}</button>
          </div>
        </div>
        <button class="mini-btn danger" onclick="rejectEnrollment('${e.id}')">&#10005; ${t('Reject','Rechazar')}</button>
      </div>` : ''}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:.88rem">
      <div class="rc-cell"><b>${t('Child DOB','Fecha Nac.')}</b>${esc(c.dob) || '-'}</div>
      <div class="rc-cell"><b>${t('Preferred Class','Salon Pref.')}</b>${esc(LANG==='es'?(CLS_ES[DB.classes.find(x=>x.id===c.classPreference)?.name||'']||DB.classes.find(x=>x.id===c.classPreference)?.name||'-'):DB.classes.find(x=>x.id===c.classPreference)?.name||'-')}</div>
      <div class="rc-cell"><b>${t('Allergies','Alergias')}</b>${esc(c.allergies)||t('None','Ninguna')}</div>
      <div class="rc-cell"><b>${t('Start Date','Fecha Inicio')}</b>${c.startDate ? fmtDate(c.startDate) : '-'}</div>
    </div>
    ${c.food ? `<div class="rc-note" style="margin-top:8px"><b>${t('Food / Diet','Comida / Dieta')}</b>${esc(c.food)}</div>` : ''}
    ${c.medical ? `<div class="rc-note" style="margin-top:6px"><b>${t('Medical Notes','Notas Medicas')}</b>${esc(c.medical)}</div>` : ''}
    ${c.notes ? `<div class="rc-note" style="margin-top:6px"><b>${t('Additional Notes','Notas Adicionales')}</b>${esc(c.notes)}</div>` : ''}
    <hr style="border:none;border-top:1px solid #EAE2DA;margin:12px 0 8px">
    <div style="font-size:.85rem;color:var(--muted)">
      <b style="color:var(--night)">${t('Parent:','Padre/Madre:')} ${esc(p.name)}</b>
      &nbsp;|&nbsp; &#128222; <a href="tel:${esc(p.phone.replace(/\D/g,''))}" class="contact-link">${esc(p.phone)}</a>
      ${p.email ? `&nbsp;|&nbsp; &#9993; <a href="mailto:${esc(p.email)}" class="contact-link">${esc(p.email)}</a>` : ''}
      ${p.address ? `<br>&#128205; ${esc(p.address)}` : ''}
    </div>
    <div style="font-size:.83rem;color:var(--muted);margin-top:4px">
      ${t('Emergency:','Emergencia:')} ${esc(c.emergencyName)} &mdash; <a href="tel:${esc(c.emergencyPhone.replace(/\D/g,''))}" class="contact-link">${esc(c.emergencyPhone)}</a>
    </div>
    ${e.status === 'approved' && e.assignedClassId ? `<div style="margin-top:8px;font-size:.83rem;color:var(--teal);font-weight:800">&#9989; ${t('Enrolled in:','Inscrito en:')} ${esc(LANG==='es'?(CLS_ES[DB.classes.find(x=>x.id===e.assignedClassId)?.name||'']||DB.classes.find(x=>x.id===e.assignedClassId)?.name||'-'):DB.classes.find(x=>x.id===e.assignedClassId)?.name||'-')}</div>` : ''}
  </div>`;
}

/* ===================== ACTIONS ===================== */
function toggleEcParent(labelEl, parentId, childId) {
  const cb = labelEl.querySelector('input[type="checkbox"]');
  if (!cb) return;
  // checkbox state toggled by the click already — just update visual
  setTimeout(() => {
    const on = cb.checked;
    labelEl.style.background = on ? '#DCEFE9' : '#fff';
    labelEl.style.borderColor = on ? 'var(--teal)' : '#EAE2DA';
  }, 0);
}

function saveChildEdit() {
  const c = DB.children.find(x => x.id === EDIT_CHILD_ID);
  if (!c) return;
  const name = (document.getElementById('ec-name').value || '').trim();
  if (!name) { msg('ec-msg', errT(new Error('missing'))); return; }

  const newClassId = document.getElementById('ec-class').value;
  const teacherEl  = document.getElementById('ec-teacher');
  const teacherId  = teacherEl ? teacherEl.value : '';

  // If a specific teacher was chosen, assign them to this classroom
  if (teacherId) {
    const te = DB.users.find(u => u.id === teacherId);
    if (te) te.classId = newClassId;
  }

  c.name             = name;
  c.dob              = document.getElementById('ec-dob').value || c.dob;
  c.classId          = newClassId;
  c.allergies        = (document.getElementById('ec-allergy').value || '').trim();
  c.food             = (document.getElementById('ec-food').value || '').trim();
  c.notes            = (document.getElementById('ec-notes').value || '').trim();
  c.emergencyContact = (document.getElementById('ec-ecname').value || '').trim();
  c.emergencyPhone   = (document.getElementById('ec-ecphone').value || '').trim();

  // Update parent links if admin form
  const parentBoxes = document.querySelectorAll('.ec-parent');
  if (parentBoxes.length) {
    c.parentIds = [...parentBoxes].filter(b => b.checked).map(b => b.value);
  }

  saveDB();
  EDIT_CHILD_ID = null;
  renderPortal();
}

function _collectChildInfo() {
  return {
    name: (document.getElementById('ef-cname').value || '').trim(),
    dob: document.getElementById('ef-dob').value || '',
    classPreference: document.getElementById('ef-class').value,
    allergies: (document.getElementById('ef-allergy').value || '').trim(),
    food: (document.getElementById('ef-food').value || '').trim(),
    medical: (document.getElementById('ef-medical').value || '').trim(),
    emergencyName: (document.getElementById('ef-ecname').value || '').trim(),
    emergencyPhone: (document.getElementById('ef-ecphone').value || '').trim(),
    startDate: document.getElementById('ef-start').value || '',
    notes: (document.getElementById('ef-notes').value || '').trim()
  };
}

function submitEnrollmentNew() {
  const pname = (document.getElementById('ef-pname').value || '').trim();
  const phone = (document.getElementById('ef-phone').value || '').trim();
  const email = (document.getElementById('ef-email').value || '').trim();
  const addr  = (document.getElementById('ef-addr').value || '').trim();
  const uname = (document.getElementById('ef-user').value || '').trim();
  const pass  = (document.getElementById('ef-pass').value || '');
  const child = _collectChildInfo();
  if (!pname || !phone || !addr || !uname || !pass || !child.name || !child.dob || !child.emergencyName || !child.emergencyPhone) {
    msg('ef-msg', t('Please fill in all required fields (marked with *).', 'Por favor complete todos los campos obligatorios (marcados con *).'));
    return;
  }
  if (pass.length < 6) { msg('ef-msg', errT(new Error('short'))); return; }
  if (DB.users.find(u => u.username.toLowerCase() === uname.toLowerCase())) { msg('ef-msg', errT(new Error('taken'))); return; }
  const newParent = { id: uid(), name: pname, username: uname, password: pass, role: 'parent', classId: null, phone, email, address: addr };
  DB.users.push(newParent);
  const enrollment = { id: uid(), parentId: newParent.id, parentInfo: { name: pname, phone, email, address: addr, username: uname }, childInfo: child, status: 'pending', submittedDate: today(), assignedClassId: null, childId: null };
  DB.enrollments.push(enrollment);
  saveDB();
  CU = newParent;
  SUB = 'children';
  const root = document.getElementById('enrollment-root');
  if (root) root.innerHTML = `<div class="card t-teal">
    <p class="lead" style="font-size:1.2rem">&#127775; ${t('Enrollment Submitted!','Inscripcion Enviada!')}</p>
    <p>${t('Thank you, ','Gracias, ')}${esc(pname)}! ${t('Your account has been created and your enrollment request for','Su cuenta ha sido creada y su solicitud de inscripcion para')} <b>${esc(child.name)}</b> ${t('has been submitted for admin review.','ha sido enviada para revision del administrador.')}</p>
    <p>${t('You will be contacted within 1–2 business days. In the meantime, you can log in with your new account to check your enrollment status.','Sera contactado en 1-2 dias habiles. Mientras tanto, puede iniciar sesion con su nueva cuenta para verificar el estado.')}</p>
    <button class="btn btn-night" onclick="goTo('portal')">${t('Go to My Account', 'Ir a Mi Cuenta')} &rarr;</button>
  </div>`;
  renderPortal();
}

function submitEnrollmentExisting() {
  const child = _collectChildInfo();
  if (!child.name || !child.dob || !child.emergencyName || !child.emergencyPhone) {
    msg('ef-msg', t('Please fill in all required fields (marked with *).', 'Por favor complete todos los campos obligatorios (marcados con *).'));
    return;
  }
  const p = CU;
  const enrollment = { id: uid(), parentId: p.id, parentInfo: { name: p.name, phone: p.phone || '', email: p.email || '', username: p.username }, childInfo: child, status: 'pending', submittedDate: today(), assignedClassId: null, childId: null };
  DB.enrollments.push(enrollment);
  saveDB();
  renderEnrollment();
  msg('ef-msg', t('Enrollment submitted! An admin will review it shortly.', 'Inscripcion enviada! Un administrador la revisara pronto.'), true);
}

/* --- email helpers (mailto: opens device email client) --- */
function emailEnrollmentApproved(parentEmail, parentName, childName, className) {
  if (!parentEmail) return;
  const sub = encodeURIComponent('Mini Star Child Care - Enrollment Approved for ' + childName);
  const body = encodeURIComponent(
    'Dear ' + parentName + ',\n\n' +
    'Great news! Your enrollment request for ' + childName + ' has been APPROVED.\n\n' +
    'Your child has been enrolled in the ' + className + ' classroom.\n\n' +
    'You can now log in to your account on our website to track daily reports and messages.\n\n' +
    'Welcome to the Mini Star Child Care family!\n\n' +
    'Mini Star Child Care\n(206) 255-4000\nministarchildcare14@gmail.com\n17735 38th Ave South, SeaTac, WA 98188'
  );
  window.open('mailto:' + parentEmail + '?subject=' + sub + '&body=' + body);
}

function emailEnrollmentRejected(parentEmail, parentName, childName) {
  if (!parentEmail) return;
  const sub = encodeURIComponent('Mini Star Child Care - Enrollment Update for ' + childName);
  const body = encodeURIComponent(
    'Dear ' + parentName + ',\n\n' +
    'Thank you for your interest in Mini Star Child Care.\n\n' +
    'Unfortunately, we are unable to process the enrollment request for ' + childName + ' at this time. This may be due to limited availability.\n\n' +
    'Please contact us directly so we can assist you further.\n\n' +
    'Mini Star Child Care\n(206) 255-4000\nministarchildcare14@gmail.com\n17735 38th Ave South, SeaTac, WA 98188'
  );
  window.open('mailto:' + parentEmail + '?subject=' + sub + '&body=' + body);
}

function emailNewMessage(toEmail, toName, fromName, childName) {
  if (!toEmail) return;
  const sub = encodeURIComponent('New message from Mini Star Child Care');
  const body = encodeURIComponent(
    'Dear ' + toName + ',\n\n' +
    'You have a new message from ' + fromName + (childName ? ' regarding ' + childName : '') + '.\n\n' +
    'Please log in to your account on our website to read the message.\n\n' +
    'Mini Star Child Care\n(206) 255-4000\nministarchildcare14@gmail.com'
  );
  window.open('mailto:' + toEmail + '?subject=' + sub + '&body=' + body);
}

/* --- teacher select helpers for enrollment card --- */
function teacherSelectHtml(enrollId, classId) {
  const teachers = DB.users.filter(u => u.role === 'teacher' && u.classId === classId);
  return `<select id="approve-teacher-${enrollId}" style="border:2px solid #EAE2DA;border-radius:10px;padding:7px 10px;font-family:'Nunito',sans-serif;font-size:.88rem">
    <option value="">${t('Any (by classroom)','Cualquier maestro')}</option>
    ${teachers.map(te => `<option value="${te.id}">${esc(te.name)}</option>`).join('')}
  </select>`;
}

function onApproveClassChange(enrollId, classId) {
  const container = document.getElementById('teacher-select-' + enrollId);
  if (!container) return;
  container.innerHTML = `<div style="font-size:.72rem;font-weight:800;color:var(--muted);text-transform:uppercase;margin-bottom:3px">${t('Assign Teacher','Asignar Maestro')}</div>` + teacherSelectHtml(enrollId, classId);
}

function approveEnrollment(id) {
  const e = DB.enrollments.find(x => x.id === id);
  if (!e) return;
  const classId = document.getElementById('approve-cls-' + id).value;
  const teacherEl = document.getElementById('approve-teacher-' + id);
  const teacherId = teacherEl ? teacherEl.value : '';

  // If a specific teacher is chosen, make sure their classId matches
  if (teacherId) {
    const te = DB.users.find(u => u.id === teacherId);
    if (te && te.classId !== classId) {
      te.classId = classId;
    }
  }

  // Create or find parent user
  let parentUser = DB.users.find(u => u.id === e.parentId);
  if (!parentUser) {
    parentUser = DB.users.find(u => u.username && u.username.toLowerCase() === (e.parentInfo.username || '').toLowerCase());
  }
  if (!parentUser) {
    parentUser = { id: uid(), name: e.parentInfo.name, username: e.parentInfo.username, password: 'changeme', role: 'parent', classId: null, phone: e.parentInfo.phone || '', email: e.parentInfo.email || '', address: e.parentInfo.address || '' };
    DB.users.push(parentUser);
    e.parentId = parentUser.id;
  }

  // Create child record
  const c = e.childInfo;
  const newChild = {
    id: uid(), name: c.name, dob: c.dob, classId,
    parentIds: [parentUser.id],
    allergies: c.allergies || '', food: c.food || '',
    emergencyContact: c.emergencyName, emergencyPhone: c.emergencyPhone,
    notes: [c.medical, c.notes].filter(Boolean).join(' | ')
  };
  DB.children.push(newChild);
  e.status = 'approved';
  e.assignedClassId = classId;
  e.childId = newChild.id;
  saveDB();

  // Send approval email
  const cls = DB.classes.find(x => x.id === classId);
  emailEnrollmentApproved(parentUser.email, parentUser.name, c.name, cls ? cls.name : '');

  renderPortal();
}

function rejectEnrollment(id) {
  if (!confirm(t('Reject this enrollment request?', 'Rechazar esta solicitud de inscripcion?'))) return;
  const e = DB.enrollments.find(x => x.id === id);
  if (!e) return;
  e.status = 'rejected';
  saveDB();

  // Find parent to send rejection email
  const parentUser = DB.users.find(u => u.id === e.parentId);
  const email = (parentUser && parentUser.email) || e.parentInfo.email;
  emailEnrollmentRejected(email, e.parentInfo.name, e.childInfo.name);

  renderPortal();
}

function addChild() {
  const name = (document.getElementById('nc-name').value || '').trim();
  if (!name) { msg('nc-msg', errT(new Error('missing'))); return; }
  const parentIds = [...document.querySelectorAll('.nc-parent:checked')].map(x => x.value);
  const child = {
    id: uid(),
    name,
    dob: document.getElementById('nc-dob').value || '',
    classId: document.getElementById('nc-class').value,
    parentIds,
    allergies: (document.getElementById('nc-allergy').value || '').trim(),
    food: (document.getElementById('nc-food') ? document.getElementById('nc-food').value : '').trim(),
    emergencyContact: (document.getElementById('nc-ec').value || '').trim(),
    notes: (document.getElementById('nc-notes').value || '').trim()
  };
  DB.children.push(child);
  saveDB();
  msg('nc-msg', t('Child added!', 'Nino agregado!'), true);
  renderPortal();
}

function delChild(id) {
  if (!confirm(t('Remove this child and all their data?', 'Eliminar este nino y todos sus datos?'))) return;
  DB.children = DB.children.filter(c => c.id !== id);
  DB.reports = DB.reports.filter(r => r.childId !== id);
  DB.messages = DB.messages.filter(m => m.childId !== id);
  saveDB();
  renderPortal();
}

function addTeacher() {
  const name = (document.getElementById('nt-name').value || '').trim();
  const u = (document.getElementById('nt-user').value || '').trim();
  const p = (document.getElementById('nt-pass').value || '');
  if (!name || !u || !p) { msg('nt-msg', errT(new Error('missing'))); return; }
  if (p.length < 6) { msg('nt-msg', errT(new Error('short'))); return; }
  if (DB.users.find(x => x.username.toLowerCase() === u.toLowerCase())) { msg('nt-msg', errT(new Error('taken'))); return; }
  DB.users.push({ id: uid(), name, username: u, password: p, role: 'teacher', classId: document.getElementById('nt-class').value });
  saveDB();
  renderPortal();
}

function delUser(id) {
  if (!confirm(t('Remove this account?', 'Eliminar esta cuenta?'))) return;
  DB.users = DB.users.filter(u => u.id !== id);
  DB.children.forEach(c => { c.parentIds = (c.parentIds || []).filter(x => x !== id); });
  saveDB();
  renderPortal();
}

function toggleLink(parentId, childId, on) {
  const c = DB.children.find(x => x.id === childId);
  if (!c) return;
  c.parentIds = c.parentIds || [];
  if (on) { if (!c.parentIds.includes(parentId)) c.parentIds.push(parentId); }
  else { c.parentIds = c.parentIds.filter(x => x !== parentId); }
  saveDB();
}

function quickCheck(childId, kind) {
  const d = today();
  let r = getReport(childId, d);
  if (!r) {
    r = { id: uid(), childId, teacherId: CU.id, date: d, checkIn: '', checkOut: '', mood: '', meals: '', nap: '', activities: '', note: '' };
    DB.reports.push(r);
  }
  if (kind === 'in') r.checkIn = nowTime();
  else r.checkOut = nowTime();
  saveDB();
  renderPortal();
}

function saveReport() {
  const childId = document.getElementById('rp-child').value;
  const date = document.getElementById('rp-date').value || today();
  let r = getReport(childId, date);
  const body = {
    childId, date, teacherId: CU.id,
    checkIn: document.getElementById('rp-in').value,
    checkOut: document.getElementById('rp-out').value,
    mood: FORM_MOOD,
    meals: (document.getElementById('rp-meals').value || '').trim(),
    nap: (document.getElementById('rp-nap').value || '').trim(),
    activities: (document.getElementById('rp-act').value || '').trim(),
    note: (document.getElementById('rp-note').value || '').trim()
  };
  if (r) { Object.assign(r, body); }
  else { DB.reports.push({ id: uid(), ...body }); }
  saveDB();
  FORM_MOOD = '';
  msg('rp-msg', t('Report saved! Parents can now see it.', 'Reporte guardado! Los padres ya pueden verlo.'), true);
  renderPortal();
}

function _notifyRecipientByEmail(toId, childId) {
  const toUser = userById(toId);
  if (!toUser || !toUser.email) return;
  // Only email if recipient is a parent or teacher (has email set)
  const child = childId ? childById(childId) : null;
  emailNewMessage(toUser.email, toUser.name, CU.name, child ? child.name : '');
}

function adminSendMsg() {
  const toId = document.getElementById('am-to').value;
  const childId = document.getElementById('am-child').value;
  const text = (document.getElementById('am-text').value || '').trim();
  if (!toId || !text) { msg('am-msg', errT(new Error('missing'))); return; }
  DB.messages.push({ id: uid(), fromId: CU.id, toId, childId: childId || null, text, date: today(), time: nowTime(), read: false });
  saveDB();
  document.getElementById('am-text').value = '';
  msg('am-msg', t('Message sent!', 'Mensaje enviado!'), true);
  _notifyRecipientByEmail(toId, childId || null);
  renderPortal();
}

function teacherSendMsg() {
  const toId = document.getElementById('tm-to').value;
  const childId = document.getElementById('tm-child').value;
  const text = (document.getElementById('tm-text').value || '').trim();
  if (!toId || !text) { msg('tm-msg', errT(new Error('missing'))); return; }
  DB.messages.push({ id: uid(), fromId: CU.id, toId, childId: childId || null, text, date: today(), time: nowTime(), read: false });
  saveDB();
  document.getElementById('tm-text').value = '';
  msg('tm-msg', t('Message sent!', 'Mensaje enviado!'), true);
  _notifyRecipientByEmail(toId, childId || null);
  renderPortal();
}

function parentSendMsg() {
  const toId = document.getElementById('pm-to').value;
  const childEl = document.getElementById('pm-child');
  const childId = childEl ? childEl.value : '';
  const text = (document.getElementById('pm-text').value || '').trim();
  if (!toId || !text) { msg('pm-msg', errT(new Error('missing'))); return; }
  DB.messages.push({ id: uid(), fromId: CU.id, toId, childId: childId || null, text, date: today(), time: nowTime(), read: false });
  saveDB();
  document.getElementById('pm-text').value = '';
  msg('pm-msg', t('Message sent!', 'Mensaje enviado!'), true);
  _notifyRecipientByEmail(toId, childId || null);
  renderPortal();
}

/* ---------- change password ---------- */
function changePassword() {
  const oldPass = prompt(t('Enter your current password:', 'Ingrese su contrasena actual:'));
  if (oldPass == null) return;
  if (oldPass !== CU.password) {
    alert(t('Current password is incorrect.', 'La contrasena actual es incorrecta.'));
    return;
  }
  const newPass = prompt(t('Enter your new password (at least 6 characters):', 'Ingrese su nueva contrasena (minimo 6 caracteres):'));
  if (newPass == null) return;
  if (newPass.length < 6) {
    alert(t('Password must be at least 6 characters.', 'La contrasena debe tener al menos 6 caracteres.'));
    return;
  }
  const confirmPass = prompt(t('Confirm your new password:', 'Confirme su nueva contrasena:'));
  if (confirmPass !== newPass) {
    alert(t('Passwords do not match.', 'Las contrasenas no coinciden.'));
    return;
  }
  // Update in DB
  const u = DB.users.find(x => x.id === CU.id);
  if (u) u.password = newPass;
  CU.password = newPass;
  saveDB();
  alert(t('Password changed successfully!', 'Contrasena cambiada exitosamente!'));
}

/* ---------- forgot / reset password ---------- */
let _FORGOT_STEP = 0; // 0=login, 1=request code, 2=enter code+new pass
let _FORGOT_USER = '';

function showForgotPassword() { _FORGOT_STEP = 1; renderPortal(); }
function backToLogin() { _FORGOT_STEP = 0; _FORGOT_USER = ''; renderPortal(); }

function forgotPasswordView() {
  if (_FORGOT_STEP === 1) {
    return `<div class="portal-card">
      <h2 style="text-align:center;font-size:1.3rem">&#128273; ${t('Forgot Password','Olvidé mi Contraseña')}</h2>
      <p class="soft" style="text-align:center;font-size:.9rem">${t('Enter your username to request a reset code.','Ingrese su usuario para solicitar un código de restablecimiento.')}</p>
      <div class="field"><label>${t('Username','Usuario')}</label><input id="fp-user" placeholder="admin"></div>
      <button class="btn btn-night btn-full" onclick="requestResetCode()">${t('Request Code','Solicitar Código')}</button>
      <div class="form-msg" id="fp-msg"></div>
      <p style="text-align:center;margin-top:14px"><button class="mini-btn ghost" onclick="backToLogin()">&#8592; ${t('Back to Sign In','Volver al Inicio de Sesión')}</button></p>
    </div>`;
  }
  if (_FORGOT_STEP === 2) {
    return `<div class="portal-card">
      <h2 style="text-align:center;font-size:1.3rem">&#128273; ${t('Reset Password','Restablecer Contraseña')}</h2>
      <p class="soft" style="text-align:center;font-size:.9rem">${t('Enter the reset code and your new password.','Ingrese el código y su nueva contraseña.')}</p>
      <div class="field"><label>${t('Reset Code','Código de Restablecimiento')}</label><input id="fp-code" placeholder="123456"></div>
      <div class="field"><label>${t('New Password (min 6 chars)','Nueva Contraseña (mín 6 chars)')}</label><input id="fp-newpass" type="password"></div>
      <button class="btn btn-teal btn-full" onclick="doResetPassword()">${t('Reset Password','Restablecer Contraseña')}</button>
      <div class="form-msg" id="fp-msg2"></div>
      <p style="text-align:center;margin-top:14px"><button class="mini-btn ghost" onclick="backToLogin()">&#8592; ${t('Back to Sign In','Volver al Inicio de Sesión')}</button></p>
    </div>`;
  }
  return '';
}

function requestResetCode() {
  const un = (document.getElementById('fp-user').value || '').trim();
  if (!un) { msg('fp-msg', t('Enter your username.','Ingrese su usuario.')); return; }
  _FORGOT_USER = un;
  fetch('/api/auth/forgot-password', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:un})})
    .then(r=>r.json()).then(d=>{
      if(d.ok||d.message){
        _FORGOT_STEP = 2;
        msg('fp-msg', t('Code generated. Ask your admin for the code.','Código generado. Pida al administrador el código.'), true);
        setTimeout(()=>renderPortal(), 1500);
      } else {
        msg('fp-msg', d.error || t('User not found.','Usuario no encontrado.'));
      }
    }).catch(()=>msg('fp-msg', t('Server unavailable.','Servidor no disponible.')));
}

function doResetPassword() {
  const code = (document.getElementById('fp-code').value || '').trim();
  const np = document.getElementById('fp-newpass').value;
  if (!code || !np) { msg('fp-msg2', t('Fill in all fields.','Complete todos los campos.')); return; }
  if (np.length < 6) { msg('fp-msg2', t('Password must be at least 6 characters.','La contraseña debe tener al menos 6 caracteres.')); return; }
  fetch('/api/auth/reset-password', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:_FORGOT_USER,code,new_password:np})})
    .then(r=>r.json()).then(d=>{
      if(d.ok){
        msg('fp-msg2', t('Password reset! You can now sign in.','Contraseña restablecida. Puede iniciar sesión ahora.'), true);
        setTimeout(()=>{ _FORGOT_STEP=0; _FORGOT_USER=''; renderPortal(); }, 2000);
      } else {
        msg('fp-msg2', d.error || t('Invalid or expired code.','Código inválido o expirado.'));
      }
    }).catch(()=>msg('fp-msg2', t('Server unavailable.','Servidor no disponible.')));
}

/* ---------- init ---------- */
loadDB();
if (typeof initCurriculumDB === 'function') initCurriculumDB();
applyLang();
document.querySelectorAll('[data-page="portal"]').forEach(b => b.addEventListener('click', () => { if (CU) renderPortal(); }));
document.querySelectorAll('[data-page="enrollment"]').forEach(b => b.addEventListener('click', () => setTimeout(renderEnrollment, 0)));
renderPortal();
renderEnrollment();

// Poll notification count every 60 seconds when logged in with API token
setInterval(() => {
  if (!CU || !apiToken()) return;
  apiFetch('/api/notifications/unread-count').then(r=>r.ok?r.json():null).then(d=>{
    if(d&&typeof d.count==='number'&&d.count!==_NOTIF_UNREAD){_NOTIF_UNREAD=d.count;renderPortal();}
  }).catch(()=>{});
}, 60000);

// SSE — real-time push from server (connects once user has a token)
function _initSSE() {
  const tk = apiToken();
  if (!tk || _SSE_SOURCE) return;
  try {
    _SSE_SOURCE = new EventSource('/api/sse?token=' + encodeURIComponent(tk));
    _SSE_SOURCE.onmessage = (e) => {
      try {
        const d = JSON.parse(e.data);
        if (d.type === 'notification') { _NOTIF_UNREAD = null; _NOTIF = null; renderPortal(); }
      } catch {}
    };
    _SSE_SOURCE.onerror = () => { _SSE_SOURCE && _SSE_SOURCE.close(); _SSE_SOURCE = null; };
  } catch {}
}
