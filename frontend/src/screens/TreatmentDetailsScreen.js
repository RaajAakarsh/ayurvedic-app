import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./TreatmentDetails.css";

const treatmentData = {
  "Digestive Health": {
    title: "Digestive Health in Ayurveda",
    description:
      "Digestion is the foundation of health in Ayurveda. A strong Agni (digestive fire) ensures proper metabolism, while imbalances can lead to Ama (toxins) and digestive disorders.",
    concerns: [
      {
        title: "Acid Reflux & Heartburn (Amla Pitta)",
        description:
          "Acid reflux occurs when stomach acid moves up into the esophagus, causing a burning sensation in the chest (heartburn). Ayurveda links this to Pitta Dosha imbalance, aggravated by spicy, oily, and acidic foods.",
        approach: [
          "Avoid hot, sour, and fermented foods. Drink cool herbal teas like fennel (Saunf) and licorice (Mulethi).",
          "Eat meals on time and avoid lying down immediately after eating.",
          "Herbs: Amla, Guduchi, Yashtimadhu (Licorice) help soothe excess acidity.",
        ],
        image: require("../media/hb.png"),
      },
      {
        title: "Constipation & Indigestion (Vibandh & Ajirna)",
        description:
          "Constipation refers to infrequent or difficult bowel movements, often caused by Vata imbalance. Indigestion (Ajirna) happens when food isn’t properly broken down, leading to bloating and discomfort.",
        approach: [
          "Increase fiber-rich foods like soaked raisins, ghee, and warm fluids.",
          "Regular meal timings and Abhyanga (self-massage with warm oil) to calm Vata.",
          "Herbs: Triphala, Isabgol (Psyllium husk), and castor oil for gentle relief.",
        ],
        image: "/images/constipation.jpg",
      },
      {
        title: "Diarrhea & Loose Motions (Atisara)",
        description:
          "Frequent loose stools indicate an aggravated Pitta Dosha or Kapha Dosha. It can be due to infections, food intolerance, or weak digestion.",
        approach: [
          "Light, easy-to-digest foods like moong dal khichdi, buttermilk, and pomegranate juice.",
          "Rest and hydration are key. Avoid heavy, oily, and dairy-rich foods.",
          "Herbs: Bilva (Bael fruit), Kutaj (Holarrhena), and Pippali help restore gut balance.",
        ],
        image: "/images/diarrhea.jpg",
      },
      {
        title: "Irritable Bowel Syndrome (IBS)",
        description:
          "IBS causes alternating constipation, diarrhea, bloating, and stomach cramps. Ayurveda links this to an imbalance in Vata Dosha, often triggered by stress, irregular eating, or improper food combinations.",
        approach: [
          "Follow a Satvic (light & fresh) diet with warm, well-cooked foods.",
          "Stress management through meditation and yoga is crucial.",
          "Herbs: Ashwagandha for stress, Triphala for digestion, and Brahmi for calming the mind.",
        ],
        image: "/images/ibs.jpg",
      },
      {
        title: "Stomach Ulcers (Parinam Shoola)",
        description:
          "Ulcers are open sores in the stomach lining, often due to excessive Pitta Dosha, stress, or infection. They cause burning pain, nausea, and acid regurgitation.",
        approach: [
          "Cooling foods like coconut water, ghee, and soaked almonds. Avoid spicy, fried, and caffeine-based foods.",
          "Reduce stress through pranayama and maintain meal discipline.",
          "Herbs: Yashtimadhu (Licorice), Shatavari, and Aloe Vera help soothe the stomach lining.",
        ],
        image: "/images/ulcers.jpg",
      },
    ],
  },

  "Respiratory Health": {
    title: "Respiratory Health in Ayurveda",
    description:
      "The respiratory system is governed by Prana Vayu (life force energy) and influenced by Kapha Dosha (mucus & moisture balance) and Vata Dosha (air & movement). Imbalances in these doshas can lead to chronic respiratory conditions. Ayurveda focuses on herbal remedies, dietary modifications, and lifestyle changes to strengthen the lungs, clear toxins, and restore breath balance.",
    concerns: [
      {
        title: "Asthma & Breathing Problems (Tamaka Shwasa)",
        description:
          "Asthma is a chronic lung condition that causes difficulty in breathing due to airway inflammation and mucus buildup. Ayurveda considers it a Kapha-Vata disorder, where excess mucus blocks airflow, and Vata creates spasms in the lungs.",
        approach: [
          "Diet: Avoid cold, heavy, and dairy-based foods. Consume warm herbal drinks like ginger-turmeric tea.",
          "Lifestyle: Steam inhalation with eucalyptus oil and Pranayama (breathing exercises) for lung strength.",
          "Herbs: Vasaka (Malabar Nut), Yashtimadhu (Licorice), Tulsi (Holy Basil) help open airways.",
        ],
        image: "/images/asthma.jpg",
      },
      {
        title: "Chronic Cough & Cold (Kasa & Pratishaya)",
        description:
          "Frequent coughs and colds occur due to low immunity, seasonal changes, or Kapha-Vata imbalances. Coughing can be dry (Vata) or mucus-filled (Kapha), requiring different treatments.",
        approach: [
          "Diet: Warm, easy-to-digest meals. Avoid cold drinks and excess sweets.",
          "Lifestyle: Keep the body warm, do oil massage (Abhyanga) to balance Vata.",
          "Herbs: Sitopaladi Churna, Mulethi (Licorice), and Pippali (Long Pepper) help relieve congestion.",
        ],
        image: "/images/cough.jpg",
      },
      {
        title: "Sinusitis & Nasal Congestion (Peenas)",
        description:
          "Sinusitis is caused by Kapha imbalance, where mucus gets trapped in the sinuses, leading to headaches, congestion, and difficulty breathing.",
        approach: [
          "Diet: Avoid heavy, oily, and dairy-rich foods. Drink warm herbal teas with Tulsi & Ginger.",
          "Lifestyle: Neti Kriya (nasal cleansing with saline water) and steam inhalation help clear sinuses.",
          "Herbs: Trikatu (Ginger, Black Pepper, Pippali), Neem, and Dashmool work effectively.",
        ],
        image: "/images/sinusitis.jpg",
      },
      {
        title: "Bronchitis & Chest Infections (Kasa Roga)",
        description:
          "Bronchitis occurs when the bronchial tubes in the lungs become inflamed, leading to persistent cough, phlegm, and breathing difficulties. It is caused by Kapha accumulation, cold exposure, or viral infections.",
        approach: [
          "Diet: Warm, light meals like moong dal soup and herbal tonics. Avoid fried foods and cold beverages.",
          "Lifestyle: Steam inhalation, chest massage with warm mustard oil, and gargling with turmeric water.",
          "Herbs: Vasaka, Tulsi, and Licorice help soothe the airways.",
        ],
        image: "/images/bronchitis.jpg",
      },
    ],
  },
};

const ayurvedicConsultation = {
  title: "Why Choose Ayurvedic Consultation?",
  points: [
    "Personalized Treatment based on Dosha balance.",
    "Natural Healing with diet, herbs, and lifestyle changes.",
    "Long-Term Relief rather than symptomatic suppression.",
    "Mind-Body Balance for holistic well-being.",
  ],
  callToAction: "💬 Not sure where to start? Book an online consultation with our certified Ayurvedic doctors today!",
};

function TreatmentDetailsScreen() {
  const { category } = useParams();
  const navigate = useNavigate();
  const details = treatmentData[decodeURIComponent(category)];

  if (!details) {
    return <h2>Category not found.</h2>;
  }

  return (
    <div className="treatment-details">
      <Link to="/treatments" className="back-link">← Back</Link>
      <h1>{details.title}</h1>
      <p>{details.description}</p>
      <h2 className="ttitle">Common Concerns & Ayurvedic Approach</h2>

      {details.concerns.map((concern, index) => (
        <div
          key={index}
          className={`concern-row ${index % 2 === 0 ? "row-reverse" : ""}`}
        >
          <img src={concern.image} alt={concern.title} className="concern-image" />
          <div className="concern-content">
            <h3>{concern.title}</h3>
            <p>{concern.description}</p>
            <h4>Ayurvedic Approach:</h4>
            <ul>
              {concern.approach.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
            <p>{concern.callToAction}</p>
          </div>
        </div>
      ))}
      <div className="consultation-section">
        <h2>{ayurvedicConsultation.title}</h2>
        <ul>
          {ayurvedicConsultation.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        <p>{ayurvedicConsultation.callToAction}</p>
      </div>
    </div>
  );
}

export default TreatmentDetailsScreen;
