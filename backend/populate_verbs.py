import sqlite3
import mlconjug3
import json
import warnings
import sys
warnings.filterwarnings('ignore')

DB_PATH = 'backend/french_learning.db'

db = sqlite3.connect(DB_PATH)
cursor = db.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS verbs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    infinitive TEXT UNIQUE NOT NULL,
    english TEXT DEFAULT '',
    verb_group TEXT DEFAULT '',
    frequency INTEGER DEFAULT 9999,
    is_irregular INTEGER DEFAULT 0,
    tense_present TEXT DEFAULT '{}',
    tense_imparfait TEXT DEFAULT '{}',
    tense_futur TEXT DEFAULT '{}',
    tense_passe_simple TEXT DEFAULT '{}',
    tense_conditionnel TEXT DEFAULT '{}',
    tense_subjonctif TEXT DEFAULT '{}',
    tense_imperatif TEXT DEFAULT '{}',
    tense_passe_compose TEXT DEFAULT '{}',
    participe_passe TEXT DEFAULT '',
    participe_present TEXT DEFAULT '',
    notes TEXT DEFAULT ''
)''')
cursor.execute('CREATE INDEX IF NOT EXISTS idx_verbs_infinitive ON verbs(infinitive)')
cursor.execute('CREATE INDEX IF NOT EXISTS idx_verbs_group ON verbs(verb_group)')
db.commit()

print("Table created. Initializing conjugator...")
conjugator = mlconjug3.Conjugator(language='fr')
cm = conjugator.conjug_manager
all_verbs = list(cm.verbs.keys())
print(f'Total verbs in mlconjug3: {len(all_verbs)}')

PERSON_MAP = {'1s': 'je', '2s': 'tu', '3s': 'il', '1p': 'nous', '2p': 'vous', '3p': 'ils'}
IMPERATIVE_MAP = {'2s': 'tu', '1p': 'nous', '2p': 'vous'}

AVOIR_PRESENT = {'je': 'ai', 'tu': 'as', 'il': 'a', 'nous': 'avons', 'vous': 'avez', 'ils': 'ont'}
ETRE_PRESENT  = {'je': 'suis', 'tu': 'es', 'il': 'est', 'nous': 'sommes', 'vous': 'êtes', 'ils': 'sont'}

ETRE_VERBS = {
    'aller','arriver','descendre','entrer','monter','mourir','naître','partir',
    'passer','rester','retourner','revenir','sortir','tomber','venir','décéder',
    'rentrer','redescendre','remonter','repartir','ressortir','retomber','revenir',
}

COMMON_TRANSLATIONS = {
    'avoir':'to have','être':'to be','aller':'to go','faire':'to do / make',
    'pouvoir':'can / to be able to','vouloir':'to want','savoir':'to know',
    'venir':'to come','devoir':'to must / owe','prendre':'to take',
    'voir':'to see','dire':'to say / tell','parler':'to speak','partir':'to leave',
    'sortir':'to go out','mettre':'to put','donner':'to give','trouver':'to find',
    'penser':'to think','regarder':'to watch / look','aimer':'to like / love',
    'manger':'to eat','boire':'to drink','lire':'to read','écrire':'to write',
    'entendre':'to hear','commencer':'to start','finir':'to finish','ouvrir':'to open',
    'fermer':'to close','arriver':'to arrive','rentrer':'to return home',
    'rester':'to stay','vivre':'to live','mourir':'to die','naître':'to be born',
    'tomber':'to fall','monter':'to go up','descendre':'to go down','entrer':'to enter',
    'acheter':'to buy','vendre':'to sell','payer':'to pay','travailler':'to work',
    'jouer':'to play','chanter':'to sing','danser':'to dance','courir':'to run',
    'marcher':'to walk','dormir':'to sleep','appeler':'to call','répondre':'to answer',
    'demander':'to ask','attendre':'to wait','comprendre':'to understand',
    'apprendre':'to learn','enseigner':'to teach','étudier':'to study',
    'connaître':'to know (a person)','croire':'to believe','sentir':'to feel / smell',
    'tenir':'to hold','porter':'to carry / wear','montrer':'to show',
    'expliquer':'to explain','choisir':'to choose','réussir':'to succeed',
    'remplir':'to fill','construire':'to build','conduire':'to drive',
    'produire':'to produce','perdre':'to lose','rendre':'to give back',
    'recevoir':'to receive','envoyer':'to send','nettoyer':'to clean',
    'essayer':'to try','se lever':'to get up','se coucher':'to go to bed',
    'laver':'to wash','habiller':'to dress','rappeler':'to remind / call back',
    'utiliser':'to use','créer':'to create','décider':'to decide',
    'permettre':'to allow','devenir':'to become','revenir':'to come back',
    'obtenir':'to obtain','maintenir':'to maintain','retenir':'to retain',
    'contenir':'to contain','appartenir':'to belong','intervenir':'to intervene',
    'prévenir':'to warn / prevent','subvenir':'to provide for',
    'souvenir':'to remember','reconnaître':'to recognize','disparaître':'to disappear',
    'paraître':'to seem','apparaître':'to appear','rire':'to laugh','sourire':'to smile',
    'plaire':'to please','taire':'to be silent','satisfaire':'to satisfy',
    'défaire':'to undo','refaire':'to redo','contrefaire':'to counterfeit',
    'peindre':'to paint','plaindre':'to pity','craindre':'to fear',
    'contraindre':'to constrain','atteindre':'to reach','éteindre':'to turn off',
    'peindre':'to paint','joindre':'to join','rejoindre':'to rejoin',
}

FREQUENCY_MAP = {
    'avoir':1,'être':2,'aller':3,'faire':4,'pouvoir':5,'vouloir':6,'savoir':7,
    'venir':8,'devoir':9,'prendre':10,'voir':11,'dire':12,'parler':13,
    'partir':14,'sortir':15,'mettre':16,'donner':17,'trouver':18,'penser':19,
    'regarder':20,'aimer':21,'manger':22,'boire':23,'lire':24,'écrire':25,
    'entendre':26,'commencer':27,'finir':28,'ouvrir':29,'fermer':30,
    'arriver':31,'rentrer':32,'rester':33,'vivre':34,'mourir':35,'tomber':36,
    'monter':37,'descendre':38,'entrer':39,'acheter':40,'vendre':41,'payer':42,
    'travailler':43,'jouer':44,'chanter':45,'danser':46,'courir':47,'marcher':48,
    'dormir':49,'appeler':50,
}

IRREGULAR_VERBS = {
    'avoir','être','aller','faire','pouvoir','vouloir','savoir','venir','devoir',
    'voir','dire','mettre','prendre','partir','sortir','tenir','boire','croire',
    'recevoir','vivre','écrire','lire','ouvrir','courir','mourir','naître',
    'conduire','construire','peindre','plaindre','craindre','joindre','atteindre',
    'éteindre','rire','sourire','plaire','taire','connaître','paraître','apparaître',
    'disparaître','reconnaître','rompre','vaincre','coudre','moudre','résoudre',
    'dissoudre','absoudre','clore','enclore','suffire','confire','frire','luire',
    'nuire','cuire','fuir','acquérir','conquérir','requérir','s\'asseoir','valoir',
    'falloir','pleuvoir','croître','accroître','décroître','paître','repaître',
}

def get_verb_group(infinitive):
    if infinitive in IRREGULAR_VERBS:
        return 'irregular'
    if infinitive.endswith('er'):
        return '-er'
    if infinitive.endswith('ir'):
        return '-ir'
    if infinitive.endswith('re'):
        return '-re'
    return 'irregular'

def extract_tense(forms_dict, mood, tense):
    out = {}
    for code, pronoun in PERSON_MAP.items():
        val = forms_dict.get((mood, tense, code))
        if val:
            out[pronoun] = val
    return out

def build_passe_compose(verb, participe):
    if not participe:
        participe = '???'
    base = participe.split('/')[-1].strip() if '/' in participe else participe
    if verb in ETRE_VERBS:
        return {
            'je':   f'suis {base}',
            'tu':   f'es {base}',
            'il':   f'est {base}',
            'nous': f'sommes {base}s',
            'vous': f'êtes {base}s',
            'ils':  f'sont {base}s',
        }
    return {p: f'{a} {base}' for p, a in AVOIR_PRESENT.items()}

inserted = 0
errors = 0
total = len(all_verbs)

for i, verb in enumerate(all_verbs):
    try:
        result = conjugator.conjugate(verb)
        forms_dict = {}
        participe_passe = ''
        participe_present = ''

        for form in result.iterate():
            if len(form) == 4:
                mood, tense, person, conjugated = form
                if mood == 'Participe' and 'Passé' in tense:
                    if not participe_passe:
                        participe_passe = conjugated
                elif mood == 'Participe' and 'Présent' in tense:
                    if not participe_present:
                        participe_present = conjugated
                elif mood == 'Infinitif':
                    pass
                else:
                    forms_dict[(mood, tense, person)] = conjugated

        present     = extract_tense(forms_dict, 'Indicatif', 'Présent')
        imparfait   = extract_tense(forms_dict, 'Indicatif', 'Imparfait')
        futur       = extract_tense(forms_dict, 'Indicatif', 'Futur')
        passe_simple= extract_tense(forms_dict, 'Indicatif', 'Passé Simple')
        conditionnel= extract_tense(forms_dict, 'Conditionnel', 'Présent')
        subjonctif  = extract_tense(forms_dict, 'Subjonctif', 'Présent')

        imperatif = {}
        for code, pronoun in IMPERATIVE_MAP.items():
            val = forms_dict.get(('Imperatif', 'Imperatif Présent', code))
            if val:
                imperatif[pronoun] = val

        passe_compose = build_passe_compose(verb, participe_passe)
        group = get_verb_group(verb)
        english = COMMON_TRANSLATIONS.get(verb, '')
        freq = FREQUENCY_MAP.get(verb, 9999)
        is_irr = 1 if group == 'irregular' else 0

        cursor.execute('''INSERT OR REPLACE INTO verbs
            (infinitive, english, verb_group, frequency, is_irregular,
             tense_present, tense_imparfait, tense_futur, tense_passe_simple,
             tense_conditionnel, tense_subjonctif, tense_imperatif, tense_passe_compose,
             participe_passe, participe_present, notes)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)''',
            (verb, english, group, freq, is_irr,
             json.dumps(present,      ensure_ascii=False),
             json.dumps(imparfait,    ensure_ascii=False),
             json.dumps(futur,        ensure_ascii=False),
             json.dumps(passe_simple, ensure_ascii=False),
             json.dumps(conditionnel, ensure_ascii=False),
             json.dumps(subjonctif,   ensure_ascii=False),
             json.dumps(imperatif,    ensure_ascii=False),
             json.dumps(passe_compose,ensure_ascii=False),
             participe_passe, participe_present, ''))
        inserted += 1
        if inserted % 500 == 0:
            db.commit()
            print(f'  {inserted}/{total} verbs processed...')

    except Exception as e:
        errors += 1
        if errors <= 5:
            print(f'  Error on "{verb}": {e}')

db.commit()
db.close()
print(f'\nDone! Inserted: {inserted}, Errors: {errors}, Total: {total}')
