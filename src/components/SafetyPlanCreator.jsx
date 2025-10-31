import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/safety-plan.css';

const SafetyPlanCreator = () => {
  const { t } = useLanguage();
  const [plan, setPlan] = useState({
    safeContacts: [],
    exitPlan: '',
    emergencyBag: [],
    codeWord: '',
    safePlace: '',
    importantDocuments: [],
    financialInfo: '',
    childrenPlan: ''
  });

  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });
  const [newDocument, setNewDocument] = useState('');
  const [newBagItem, setNewBagItem] = useState('');

  useEffect(() => {
    // localStorage'dan planı yükle
    const savedPlan = localStorage.getItem('safetyPlan');
    if (savedPlan) {
      try {
        setPlan(JSON.parse(savedPlan));
      } catch (e) {
        console.error('Plan yüklenirken hata:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Planı otomatik kaydet
    localStorage.setItem('safetyPlan', JSON.stringify(plan));
  }, [plan]);

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setPlan({
        ...plan,
        safeContacts: [...plan.safeContacts, { ...newContact, id: Date.now() }]
      });
      setNewContact({ name: '', phone: '', relationship: '' });
    }
  };

  const removeContact = (id) => {
    setPlan({
      ...plan,
      safeContacts: plan.safeContacts.filter(c => c.id !== id)
    });
  };

  const addDocument = () => {
    if (newDocument.trim()) {
      setPlan({
        ...plan,
        importantDocuments: [...plan.importantDocuments, { id: Date.now(), name: newDocument }]
      });
      setNewDocument('');
    }
  };

  const removeDocument = (id) => {
    setPlan({
      ...plan,
      importantDocuments: plan.importantDocuments.filter(d => d.id !== id)
    });
  };

  const addBagItem = () => {
    if (newBagItem.trim()) {
      setPlan({
        ...plan,
        emergencyBag: [...plan.emergencyBag, { id: Date.now(), item: newBagItem, packed: false }]
      });
      setNewBagItem('');
    }
  };

  const removeBagItem = (id) => {
    setPlan({
      ...plan,
      emergencyBag: plan.emergencyBag.filter(item => item.id !== id)
    });
  };

  const toggleBagItem = (id) => {
    setPlan({
      ...plan,
      emergencyBag: plan.emergencyBag.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    });
  };

  const handleCall = (phone) => {
    if (window.confirm(`${t('safetyPlan.confirmCall', { phone })}`)) {
      window.open(`tel:${phone}`, '_self');
    }
  };

  const exportPlan = () => {
    const planText = `
${t('safetyPlan.exportTitle')}
${'='.repeat(50)}

${t('safetyPlan.safeContacts')}:
${plan.safeContacts.map(c => `- ${c.name} (${c.relationship}): ${c.phone}`).join('\n')}

${t('safetyPlan.codeWord')}: ${plan.codeWord}

${t('safetyPlan.safePlace')}: ${plan.safePlace}

${t('safetyPlan.exitPlan')}:
${plan.exitPlan}

${t('safetyPlan.emergencyBag')}:
${plan.emergencyBag.map(item => `${item.packed ? '✓' : '○'} ${item.item}`).join('\n')}

${t('safetyPlan.importantDocuments')}:
${plan.importantDocuments.map(d => `- ${d.name}`).join('\n')}

${t('safetyPlan.financialInfo')}:
${plan.financialInfo}

${t('safetyPlan.childrenPlan')}:
${plan.childrenPlan}

${'='.repeat(50)}
${t('safetyPlan.exportNote')}
    `.trim();

    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'güvenlik-planı.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="safety-plan-container">
      <div className="safety-plan-header">
        <h1>{t('safetyPlan.title')}</h1>
        <p>{t('safetyPlan.subtitle')}</p>
      </div>

      {/* Güvenli Kişiler */}
      <section className="plan-section">
        <h2>{t('safetyPlan.safeContacts')}</h2>
        <div className="contact-form">
          <input
            type="text"
            placeholder={t('safetyPlan.contactName')}
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            className="plan-input"
          />
          <input
            type="tel"
            placeholder={t('safetyPlan.contactPhone')}
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            className="plan-input"
          />
          <input
            type="text"
            placeholder={t('safetyPlan.contactRelationship')}
            value={newContact.relationship}
            onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
            className="plan-input"
          />
          <button onClick={addContact} className="add-btn">
            ➕ {t('common.add')}
          </button>
        </div>
        <div className="contacts-list">
          {plan.safeContacts.map(contact => (
            <div key={contact.id} className="contact-item">
              <div className="contact-info">
                <strong>{contact.name}</strong>
                <span>{contact.relationship}</span>
                <a href={`tel:${contact.phone}`} className="contact-phone" onClick={(e) => {
                  e.preventDefault();
                  handleCall(contact.phone);
                }}>
                  📞 {contact.phone}
                </a>
              </div>
              <button onClick={() => removeContact(contact.id)} className="remove-btn">
                ❌
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Kod Kelimesi ve Güvenli Yer */}
      <section className="plan-section">
        <h2>{t('safetyPlan.codeWord')}</h2>
        <input
          type="text"
          placeholder={t('safetyPlan.codeWordPlaceholder')}
          value={plan.codeWord}
          onChange={(e) => setPlan({ ...plan, codeWord: e.target.value })}
          className="plan-input full-width"
        />
        <p className="plan-hint">{t('safetyPlan.codeWordHint')}</p>
      </section>

      <section className="plan-section">
        <h2>{t('safetyPlan.safePlace')}</h2>
        <input
          type="text"
          placeholder={t('safetyPlan.safePlacePlaceholder')}
          value={plan.safePlace}
          onChange={(e) => setPlan({ ...plan, safePlace: e.target.value })}
          className="plan-input full-width"
        />
      </section>

      {/* Çıkış Planı */}
      <section className="plan-section">
        <h2>{t('safetyPlan.exitPlan')}</h2>
        <textarea
          placeholder={t('safetyPlan.exitPlanPlaceholder')}
          value={plan.exitPlan}
          onChange={(e) => setPlan({ ...plan, exitPlan: e.target.value })}
          className="plan-textarea"
          rows="6"
        />
      </section>

      {/* Acil Durum Çantası */}
      <section className="plan-section">
        <h2>{t('safetyPlan.emergencyBag')}</h2>
        <div className="bag-item-form">
          <input
            type="text"
            placeholder={t('safetyPlan.bagItemPlaceholder')}
            value={newBagItem}
            onChange={(e) => setNewBagItem(e.target.value)}
            className="plan-input"
            onKeyPress={(e) => e.key === 'Enter' && addBagItem()}
          />
          <button onClick={addBagItem} className="add-btn">
            ➕
          </button>
        </div>
        <div className="bag-list">
          {plan.emergencyBag.map(item => (
            <div key={item.id} className={`bag-item ${item.packed ? 'packed' : ''}`}>
              <label className="bag-checkbox">
                <input
                  type="checkbox"
                  checked={item.packed}
                  onChange={() => toggleBagItem(item.id)}
                />
                <span>{item.item}</span>
              </label>
              <button onClick={() => removeBagItem(item.id)} className="remove-btn-small">
                ❌
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Önemli Belgeler */}
      <section className="plan-section">
        <h2>{t('safetyPlan.importantDocuments')}</h2>
        <div className="document-form">
          <input
            type="text"
            placeholder={t('safetyPlan.documentPlaceholder')}
            value={newDocument}
            onChange={(e) => setNewDocument(e.target.value)}
            className="plan-input"
            onKeyPress={(e) => e.key === 'Enter' && addDocument()}
          />
          <button onClick={addDocument} className="add-btn">
            ➕
          </button>
        </div>
        <div className="documents-list">
          {plan.importantDocuments.map(doc => (
            <div key={doc.id} className="document-item">
              <span>📄 {doc.name}</span>
              <button onClick={() => removeDocument(doc.id)} className="remove-btn-small">
                ❌
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Finansal Bilgiler */}
      <section className="plan-section">
        <h2>{t('safetyPlan.financialInfo')}</h2>
        <textarea
          placeholder={t('safetyPlan.financialInfoPlaceholder')}
          value={plan.financialInfo}
          onChange={(e) => setPlan({ ...plan, financialInfo: e.target.value })}
          className="plan-textarea"
          rows="4"
        />
      </section>

      {/* Çocuk Planı */}
      <section className="plan-section">
        <h2>{t('safetyPlan.childrenPlan')}</h2>
        <textarea
          placeholder={t('safetyPlan.childrenPlanPlaceholder')}
          value={plan.childrenPlan}
          onChange={(e) => setPlan({ ...plan, childrenPlan: e.target.value })}
          className="plan-textarea"
          rows="4"
        />
      </section>

      {/* Export Button */}
      <div className="export-section">
        <button onClick={exportPlan} className="export-btn">
          💾 {t('safetyPlan.exportPlan')}
        </button>
        <p className="export-note">{t('safetyPlan.exportNote')}</p>
      </div>
    </div>
  );
};

export default SafetyPlanCreator;
