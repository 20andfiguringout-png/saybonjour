import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const REGIONS = [
  {
    name: 'Île-de-France',
    capital: 'Paris',
    emoji: '🗼',
    desc: 'The most populous region, centred on Paris. Home to Versailles, the Louvre, and the Eiffel Tower. The heart of French culture, politics, and business.',
    known: ['Paris', 'Versailles', 'Fontainebleau', 'Disneyland Paris'],
    food: ['Croissants', 'Baguettes', 'Macarons', 'Crème brûlée'],
    vocab: [
      { fr: 'la capitale', en: 'the capital' },
      { fr: 'le Parisien / la Parisienne', en: 'a person from Paris' },
      { fr: 'les arrondissements', en: 'the districts (Paris has 20)', note: 'Paris is divided into 20 numbered districts — the 1st is central, the 20th is east' },
    ],
  },
  {
    name: 'Bretagne (Brittany)',
    capital: 'Rennes',
    emoji: '🏴',
    desc: 'Celtic heritage, rugged coastlines, and a distinct identity. Brittany has its own language (Breton), culture, and some of the best seafood in France.',
    known: ['Mont Saint-Michel (border)', 'Saint-Malo', 'Carnac megaliths', 'Côte de Granit Rose'],
    food: ['Galettes (buckwheat crêpes)', 'Crêpes', 'Fruits de mer', 'Far breton', 'Cidre'],
    vocab: [
      { fr: 'le menhir', en: 'standing stone / menhir', note: 'A Celtic word used in French — and in Astérix!' },
      { fr: 'la galette de sarrasin', en: 'buckwheat crêpe (savoury)', note: 'Distinct from sweet crêpes — made with buckwheat flour' },
      { fr: 'le cidre', en: 'cider', note: 'The drink of Brittany — not wine. Served in bowls (bolées).' },
    ],
  },
  {
    name: 'Provence-Alpes-Côte d\'Azur',
    capital: 'Marseille',
    emoji: '🌻',
    desc: 'Sun, lavender, and the Mediterranean. This region encompasses Marseille, Nice, Cannes, and the Alps. Known for its vivid colours, markets, and cuisine.',
    known: ['Marseille', 'Nice', 'Cannes', 'Aix-en-Provence', 'Gorges du Verdon'],
    food: ['Bouillabaisse', 'Ratatouille', 'Socca (Nice)', 'Pastis', 'Tapenade'],
    vocab: [
      { fr: 'la lavande', en: 'lavender', note: 'Fields of lavender in the Luberon in July — iconic' },
      { fr: 'le mistral', en: 'the mistral (strong wind)', note: 'A cold, fierce north wind that sweeps through Provence — up to 90 km/h' },
      { fr: 'la bouillabaisse', en: 'Marseille fish stew', note: 'A strict traditional recipe — must include rascasse, and be served in two parts' },
    ],
  },
  {
    name: 'Normandie (Normandy)',
    capital: 'Caen',
    emoji: '🏰',
    desc: 'Famous for D-Day beaches, its Norman heritage, Impressionist painters, and extraordinary dairy produce. Just 2 hours from Paris.',
    known: ['D-Day beaches', 'Mont Saint-Michel', 'Étretat cliffs', 'Giverny (Monet\'s garden)'],
    food: ['Camembert', 'Calvados (apple brandy)', 'Teurgoule', 'Sole normande', 'Crème fraîche'],
    vocab: [
      { fr: 'le débarquement', en: 'the landing (D-Day)', note: 'June 6, 1944 — a deeply significant day in French and world history' },
      { fr: 'le calvados', en: 'calvados (apple brandy)', note: 'Named after the Calvados department — aged in oak barrels' },
      { fr: 'le trou normand', en: 'Norman hole (glass of calvados mid-meal)', note: 'Traditional practice: a small calvados between courses to make room!' },
    ],
  },
  {
    name: 'Alsace',
    capital: 'Strasbourg',
    emoji: '🥨',
    desc: 'A fascinating blend of French and German culture. Strasbourg is a bicultural city and seat of the European Parliament. Famous for its Christmas markets.',
    known: ['Strasbourg', 'Colmar', 'Route des Vins d\'Alsace'],
    food: ['Choucroute', 'Flammekueche (Tarte flambée)', 'Baeckeoffe', 'Munster cheese', 'Riesling wine'],
    vocab: [
      { fr: 'la choucroute', en: 'sauerkraut (Alsatian sauerkraut dish)', note: 'The iconic dish — fermented cabbage with pork, sausages, and potatoes' },
      { fr: 'le marché de Noël', en: 'Christmas market', note: 'Strasbourg\'s market ("Christkindelsmarik") is one of the oldest in Europe' },
      { fr: 'l\'Alsacien', en: 'the Alsatian dialect', note: 'Still spoken by some locals — a Germanic dialect distinct from standard German' },
    ],
  },
  {
    name: 'Occitanie',
    capital: 'Toulouse',
    emoji: '🌹',
    desc: 'The sunny south-west, from the Pyrénées to Montpellier. Once home to the troubadour tradition and the Cathar religion. Now France\'s aerospace hub.',
    known: ['Toulouse', 'Carcassonne', 'Montpellier', 'Pyrénées', 'Canal du Midi'],
    food: ['Cassoulet', 'Foie gras', 'Saucisse de Toulouse', 'Roquefort', 'Armagnac'],
    vocab: [
      { fr: 'le cassoulet', en: 'bean and meat casserole', note: 'Disputed between Toulouse, Carcassonne, and Castelnaudary — each claims the "real" version' },
      { fr: 'la ville rose', en: 'the pink city (Toulouse nickname)', note: 'Named for its distinctive pink terracotta brick buildings' },
      { fr: 'l\'occitan', en: 'Occitan language', note: 'A Romance language once widespread in southern France — still taught in some schools' },
    ],
  },
]

export default function FrenchRegionalFrance() {
  const [activeRegion, setActiveRegion] = useState(0)
  const [tab, setTab] = useState('overview')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Regions | SayBonjour!" description="Explore France's regions — Paris, Brittany, Provence, Normandy, Alsace, Occitanie — culture, food, and vocabulary." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">France's Regions</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les régions de France — culture, food, and regional vocabulary</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {REGIONS.map((r, i) => (
            <button key={r.name} onClick={() => { setActiveRegion(i); addXP(3, 'vocabulary') }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${activeRegion === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {r.emoji} {r.name}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{REGIONS[activeRegion].emoji}</span>
            <div>
              <h2 className="font-bold text-xl font-playfair text-gray-900 dark:text-cream-50">{REGIONS[activeRegion].name}</h2>
              <p className="text-xs text-gray-400">Capital: {REGIONS[activeRegion].capital}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">{REGIONS[activeRegion].desc}</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">🗺️ Known for</p>
              <div className="flex flex-wrap gap-1.5">
                {REGIONS[activeRegion].known.map(k => (
                  <span key={k} className="text-xs bg-cream-100 dark:bg-dark-warm-200 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300">{k}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">🍽️ Regional food</p>
              <div className="flex flex-wrap gap-1.5">
                {REGIONS[activeRegion].food.map(f => (
                  <span key={f} className="text-xs bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">{f}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">📖 Regional vocabulary</p>
            <div className="space-y-2">
              {REGIONS[activeRegion].vocab.map(v => (
                <div key={v.fr} className="flex items-start gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2">
                  <SpeakButton text={v.fr} size="sm" />
                  <div>
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{v.fr}</span>
                    <span className="text-xs text-gray-400 ml-2">— {v.en}</span>
                    {v.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">{v.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button onClick={() => setActiveRegion(i => Math.max(0, i - 1))} disabled={activeRegion === 0}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-dark-warm-50 text-sm font-medium text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors">
            ← Previous
          </button>
          <button onClick={() => setActiveRegion(i => Math.min(REGIONS.length - 1, i + 1))} disabled={activeRegion === REGIONS.length - 1}
            className="flex-1 py-2.5 rounded-xl bg-burgundy-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-burgundy-700 transition-colors">
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
