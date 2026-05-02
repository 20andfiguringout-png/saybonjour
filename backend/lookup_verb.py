import sys
import json
import warnings
warnings.filterwarnings('ignore')

PERSON_MAP = {'1s': 'je', '2s': 'tu', '3s': 'il', '1p': 'nous', '2p': 'vous', '3p': 'ils'}
IMPERATIVE_MAP = {'2s': 'tu', '1p': 'nous', '2p': 'vous'}

AVOIR_PRESENT = {'je': 'ai', 'tu': 'as', 'il': 'a', 'nous': 'avons', 'vous': 'avez', 'ils': 'ont'}
ETRE_PRESENT  = {'je': 'suis', 'tu': 'es', 'il': 'est', 'nous': 'sommes', 'vous': 'êtes', 'ils': 'sont'}

ETRE_VERBS = {
    'aller','arriver','descendre','entrer','monter','mourir','naître','partir',
    'passer','rester','retourner','revenir','sortir','tomber','venir','décéder',
    'rentrer','redescendre','remonter','repartir','ressortir','retomber',
}

IRREGULAR_VERBS = {
    'avoir','être','aller','faire','pouvoir','vouloir','savoir','venir','devoir',
    'voir','dire','mettre','prendre','partir','sortir','tenir','boire','croire',
    'recevoir','vivre','écrire','lire','ouvrir','courir','mourir','naître',
    'conduire','construire','peindre','plaindre','craindre','joindre','atteindre',
    'éteindre','rire','sourire','plaire','taire','connaître','paraître','apparaître',
    'disparaître','reconnaître','rompre','vaincre','coudre','moudre','résoudre',
    'dissoudre','absoudre','clore','suffire','confire','frire','luire',
    'nuire','cuire','fuir','acquérir','conquérir','valoir','falloir','pleuvoir',
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

def lookup(infinitive):
    import mlconjug3
    conjugator = mlconjug3.Conjugator(language='fr')

    result = conjugator.conjugate(infinitive)
    if result is None:
        print(json.dumps({'error': 'not_found'}))
        return

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
            elif mood != 'Infinitif':
                forms_dict[(mood, tense, person)] = conjugated

    present      = extract_tense(forms_dict, 'Indicatif', 'Présent')
    imparfait    = extract_tense(forms_dict, 'Indicatif', 'Imparfait')
    futur        = extract_tense(forms_dict, 'Indicatif', 'Futur')
    passe_simple = extract_tense(forms_dict, 'Indicatif', 'Passé Simple')
    conditionnel = extract_tense(forms_dict, 'Conditionnel', 'Présent')
    subjonctif   = extract_tense(forms_dict, 'Subjonctif', 'Présent')
    imperatif    = {}
    for code, pronoun in IMPERATIVE_MAP.items():
        val = forms_dict.get(('Imperatif', 'Imperatif Présent', code))
        if val:
            imperatif[pronoun] = val

    passe_compose = build_passe_compose(infinitive, participe_passe)
    group = get_verb_group(infinitive)
    is_irr = 1 if group == 'irregular' else 0

    print(json.dumps({
        'infinitive':        infinitive,
        'verb_group':        group,
        'is_irregular':      is_irr,
        'frequency':         9999,
        'english':           '',
        'participe_passe':   participe_passe,
        'participe_present': participe_present,
        'tense_present':     json.dumps(present,       ensure_ascii=False),
        'tense_imparfait':   json.dumps(imparfait,     ensure_ascii=False),
        'tense_futur':       json.dumps(futur,         ensure_ascii=False),
        'tense_passe_simple':json.dumps(passe_simple,  ensure_ascii=False),
        'tense_conditionnel':json.dumps(conditionnel,  ensure_ascii=False),
        'tense_subjonctif':  json.dumps(subjonctif,    ensure_ascii=False),
        'tense_imperatif':   json.dumps(imperatif,     ensure_ascii=False),
        'tense_passe_compose':json.dumps(passe_compose,ensure_ascii=False),
    }, ensure_ascii=False))

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'no_verb_provided'}))
        sys.exit(1)
    infinitive = sys.argv[1].strip().lower()
    try:
        lookup(infinitive)
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)
