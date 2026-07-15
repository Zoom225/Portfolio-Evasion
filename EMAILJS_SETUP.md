# 📧 Configuration EmailJS - Guide d'intégration

## Étapes pour configurer EmailJS avec votre formulaire de contact

### 1️⃣ Créer un compte EmailJS (gratuit)
- Allez sur [EmailJS.com](https://www.emailjs.com/)
- Créez un compte gratuit
- Confirmez votre email

### 2️⃣ Obtenir votre clé publique
- Dans le dashboard EmailJS, allez dans **Account Settings**
- Copiez votre **Public Key**

### 3️⃣ Configurer votre email (Service)
- Allez dans **Email Services**
- Cliquez sur **"Add New Service"**
- Sélectionnez **Gmail** ou votre provider
- Connectez votre boîte email (`bobypro225@gmail.com`)
- Notez l'ID du service: `service_XXXXXXX`

### 4️⃣ Créer un template d'email
- Allez dans **Email Templates**
- Cliquez sur **"Create New Template"**
- Utilisez ce template:

```
Subject: {{subject}}

De: {{from_name}} ({{from_email}})

---

{{message}}

---

Répondre à: {{reply_to}}
```

- Notez l'ID du template: `template_XXXXXXX`

### 5️⃣ Mettre à jour le code Angular
Dans le fichier `src/app/features/contact/contact.ts`, remplacez:

```typescript
private emailjsServiceId = 'YOUR_SERVICE_ID';      // Remplacez par service_XXXXXXX
private emailjsTemplateId = 'YOUR_TEMPLATE_ID';    // Remplacez par template_XXXXXXX
private emailjsPublicKey = 'YOUR_PUBLIC_KEY';      // Remplacez par votre clé publique
```

**Exemple:**
```typescript
private emailjsServiceId = 'service_1a2b3c4d5e';
private emailjsTemplateId = 'template_5e4d3c2b1a';
private emailjsPublicKey = 'publicKey1234567890abcdefg';
```

### 6️⃣ Tester
- Lancez votre app: `npm start`
- Allez sur la page **Contact**
- Remplissez le formulaire et envoyez
- Vérifiez que vous recevez l'email à `bobypro225@gmail.com` ✅

---

## 🔐 Sécurité
⚠️ **Important:** Les clés publiques sont visibles dans le code client, c'est normal pour EmailJS car il y a des limitations de sécurité côté service.

Pour plus de sécurité, vous pouvez créer un backend qui gère l'envoi d'emails.

---

## 🆘 Dépannage

### L'email n'arrive pas
1. Vérifiez que votre service Gmail accepte les connexions "Moins sécurisées"
2. Vérifiez que le template a les bonnes variables (`{{message}}`, `{{from_name}}`, etc.)
3. Vérifiez la console du navigateur pour les erreurs

### Erreur "Invalid Service ID"
- Vérifiez que vous avez copié l'ID complet du service
- Il doit commencer par `service_`

### Les variables du template ne s'affichent pas
- Vérifiez que les noms des variables correspondent exactement
- Utilisez les accolades doubles: `{{nom_variable}}`

---

## 📚 Ressources
- [Documentation EmailJS](https://www.emailjs.com/docs/)
- [Template Variables](https://www.emailjs.com/docs/user-guide/dynamic-templates/)
- [Angular Integration](https://www.emailjs.com/docs/sdk/angular/)
