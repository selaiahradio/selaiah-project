// ========================================
// SELAIAH RADIO - INTEGRACIONES
// iHostCast Ltd © 2025
// ========================================

require('dotenv').config();

// ========================================
// OPENAI - INTELIGENCIA ARTIFICIAL
// ========================================
class OpenAIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.model = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';
    this.enabled = !!this.apiKey;
  }

  async chat(message, context = []) {
    if (!this.enabled) {
      return {
        success: false,
        message: 'OpenAI no está configurado. Agrega OPENAI_API_KEY al archivo .env'
      };
    }

    try {
      const OpenAI = require('openai');
      const openai = new OpenAI({ apiKey: this.apiKey });

      const completion = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'Eres un asistente de Selaiah Radio, una radio cristiana. Ayudas a los oyentes con información sobre programas, eventos y peticiones de oración.'
          },
          ...context,
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return {
        success: true,
        response: completion.choices[0].message.content,
        usage: completion.usage
      };
    } catch (error) {
      console.error('Error en OpenAI:', error.message);
      return {
        success: false,
        message: 'Error procesando tu mensaje',
        error: error.message
      };
    }
  }

  async generateNews(topic) {
    if (!this.enabled) return null;

    try {
      const OpenAI = require('openai');
      const openai = new OpenAI({ apiKey: this.apiKey });

      const completion = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'Eres un redactor de noticias cristianas. Genera noticias breves, positivas y edificantes.'
          },
          {
            role: 'user',
            content: `Genera una noticia breve sobre: ${topic}`
          }
        ],
        temperature: 0.8,
        max_tokens: 300
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generando noticia:', error.message);
      return null;
    }
  }
}

// ========================================
// STRIPE - PAGOS
// ========================================
class StripeService {
  constructor() {
    this.secretKey = process.env.STRIPE_SECRET_KEY;
    this.enabled = !!this.secretKey;
    
    if (this.enabled) {
      const stripe = require('stripe');
      this.stripe = stripe(this.secretKey);
    }
  }

  async createPaymentIntent(amount, currency = 'usd', metadata = {}) {
    if (!this.enabled) {
      return {
        success: false,
        message: 'Stripe no está configurado'
      };
    }

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convertir a centavos
        currency,
        metadata
      });

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      };
    } catch (error) {
      console.error('Error en Stripe:', error.message);
      return {
        success: false,
        message: 'Error procesando el pago',
        error: error.message
      };
    }
  }

  async createCustomer(email, name) {
    if (!this.enabled) return null;

    try {
      const customer = await this.stripe.customers.create({
        email,
        name
      });
      return customer;
    } catch (error) {
      console.error('Error creando cliente:', error.message);
      return null;
    }
  }
}

// ========================================
// FIREBASE - NOTIFICACIONES PUSH
// ========================================
class FirebaseService {
  constructor() {
    this.projectId = process.env.FIREBASE_PROJECT_ID;
    this.privateKey = process.env.FIREBASE_PRIVATE_KEY;
    this.clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    this.enabled = !!(this.projectId && this.privateKey && this.clientEmail);

    if (this.enabled) {
      try {
        const admin = require('firebase-admin');
        
        if (!admin.apps.length) {
          admin.initializeApp({
            credential: admin.credential.cert({
              projectId: this.projectId,
              privateKey: this.privateKey.replace(/\\n/g, '\n'),
              clientEmail: this.clientEmail
            })
          });
        }
        
        this.admin = admin;
        console.log('✅ Firebase inicializado');
      } catch (error) {
        console.error('❌ Error inicializando Firebase:', error.message);
        this.enabled = false;
      }
    }
  }

  async sendNotification(token, title, body, data = {}) {
    if (!this.enabled) {
      return {
        success: false,
        message: 'Firebase no está configurado'
      };
    }

    try {
      const message = {
        notification: { title, body },
        data,
        token
      };

      const response = await this.admin.messaging().send(message);
      
      return {
        success: true,
        messageId: response
      };
    } catch (error) {
      console.error('Error enviando notificación:', error.message);
      return {
        success: false,
        message: 'Error enviando notificación',
        error: error.message
      };
    }
  }

  async sendToTopic(topic, title, body, data = {}) {
    if (!this.enabled) return { success: false };

    try {
      const message = {
        notification: { title, body },
        data,
        topic
      };

      const response = await this.admin.messaging().send(message);
      
      return {
        success: true,
        messageId: response
      };
    } catch (error) {
      console.error('Error enviando a topic:', error.message);
      return { success: false, error: error.message };
    }
  }
}

// ========================================
// SENDGRID - EMAIL
// ========================================
class EmailService {
  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY;
    this.fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@selaiah-radio.com';
    this.fromName = process.env.SENDGRID_FROM_NAME || 'Selaiah Radio';
    this.enabled = !!this.apiKey;

    if (this.enabled) {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(this.apiKey);
      this.sgMail = sgMail;
    }
  }

  async send(to, subject, html, text = null) {
    if (!this.enabled) {
      return {
        success: false,
        message: 'SendGrid no está configurado'
      };
    }

    try {
      const msg = {
        to,
        from: {
          email: this.fromEmail,
          name: this.fromName
        },
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, '')
      };

      await this.sgMail.send(msg);
      
      return {
        success: true,
        message: 'Email enviado exitosamente'
      };
    } catch (error) {
      console.error('Error enviando email:', error.message);
      return {
        success: false,
        message: 'Error enviando email',
        error: error.message
      };
    }
  }

  async sendWelcome(email, name) {
    const html = `
      <h1>¡Bienvenido a Selaiah Radio, ${name}!</h1>
      <p>Gracias por unirte a nuestra comunidad.</p>
      <p>Ahora puedes disfrutar de:</p>
      <ul>
        <li>Streaming 24/7</li>
        <li>Chat con IA para peticiones</li>
        <li>Calendario de eventos</li>
        <li>Noticias cristianas</li>
      </ul>
      <p>Bendiciones,<br>Equipo Selaiah Radio</p>
    `;

    return this.send(email, '¡Bienvenido a Selaiah Radio!', html);
  }
}

// ========================================
// ELEVENLABS - SÍNTESIS DE VOZ
// ========================================
class VoiceService {
  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY;
    this.voiceId = process.env.ELEVENLABS_VOICE_ID;
    this.enabled = !!(this.apiKey && this.voiceId);
  }

  async textToSpeech(text) {
    if (!this.enabled) {
      return {
        success: false,
        message: 'ElevenLabs no está configurado'
      };
    }

    try {
      const axios = require('axios');
      
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`,
        {
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        },
        {
          headers: {
            'xi-api-key': this.apiKey,
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer'
        }
      );

      return {
        success: true,
        audio: response.data
      };
    } catch (error) {
      console.error('Error en ElevenLabs:', error.message);
      return {
        success: false,
        message: 'Error generando audio',
        error: error.message
      };
    }
  }
}

// ========================================
// EXPORTAR SERVICIOS
// ========================================
const openAI = new OpenAIService();
const stripe = new StripeService();
const firebase = new FirebaseService();
const email = new EmailService();
const voice = new VoiceService();

module.exports = {
  openAI,
  stripe,
  firebase,
  email,
  voice,
  
  // Clases para instanciar si es necesario
  OpenAIService,
  StripeService,
  FirebaseService,
  EmailService,
  VoiceService
};

// Mostrar estado de integraciones
console.log('\n🔌 ESTADO DE INTEGRACIONES:');
console.log(`   OpenAI: ${openAI.enabled ? '✅ Activo' : '❌ Inactivo'}`);
console.log(`   Stripe: ${stripe.enabled ? '✅ Activo' : '❌ Inactivo'}`);
console.log(`   Firebase: ${firebase.enabled ? '✅ Activo' : '❌ Inactivo'}`);
console.log(`   Email: ${email.enabled ? '✅ Activo' : '❌ Inactivo'}`);
console.log(`   Voice: ${voice.enabled ? '✅ Activo' : '❌ Inactivo'}`);
console.log('');
