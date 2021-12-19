<script type="text/javascript">
    import QuizConfig from "$lib/quiz-config.svelte";
    import QuizCard from "$lib/quiz-card.svelte";

    import { quizModes } from "$lib/quiz-modes.js";
    import { guitarStrings, musicScale, selectRandomEnharmonic, musicNote } from "$lib/music.js";
    import jArray from "$lib/jarray.js";

    import '../app.css';

    let isRunningQuiz = false;
    let quizNote = { string: '', note: '' };
    let quizConfig = { mode: '', string: '' };
    let revealNote = false;

    $:shouldShowNote = ( note, string ) =>
        revealNote &&
        musicNote.isSamePitch( quizNote.note, note ) && quizNote.string === string

    const setQuizNote = () => {
        revealNote = false;
        quizNote = {
            string: quizConfig.mode === quizModes.SingleString ?
                quizConfig.string : jArray.getRandomElement( guitarStrings ),
            note: selectRandomEnharmonic( jArray.getRandomElement( musicScale ) )
        };
    }

    const getFretClass = ( fret ) => {
        if ( fret === 0 ) {
            return "open-string"
        } else if ( [ 3, 5, 7, 9 ].includes( fret ) ) {
            return "fret marker";
        }

        return "fret";
    }

    const getStringClass = ( fret, string ) => fret > 0 ? `string s${ string + 1 }` : '';

    const getNote = ( fret, string ) => {
        const firstNoteIndex = musicScale.indexOf( guitarStrings[ string ] );
        return musicScale[ (firstNoteIndex + fret) % musicScale.length ];
    }

    const handleStartQuiz = e => {
        quizConfig = e.detail;
        isRunningQuiz = true;
        setQuizNote();
    }

</script>

{#if !isRunningQuiz}
    <QuizConfig on:start={handleStartQuiz}/>
{:else }
    <QuizCard {quizNote}
              on:revealNote={() => revealNote = true}
              on:nextNote={setQuizNote}
              on:endQuiz={() => isRunningQuiz=false} />
{/if}

{#each guitarStrings as string, stringNumber}

    <div class="string-box">

        {#each musicScale as note, fretNumber}

            <div class={getFretClass(fretNumber)}>

                <div class={getStringClass(fretNumber, stringNumber)}>

                </div>

                {#if !isRunningQuiz || shouldShowNote( getNote( fretNumber, stringNumber ), string ) }
                    <div class="note-box">{getNote( fretNumber, stringNumber )}</div>
                {/if}
            </div>

        {/each}

    </div>

{/each}

<style>
    .fret {
        border-right: solid 1px black;
        height: 26px;
        min-width: 80px;
        display: flex;
        align-items: center;
        position: relative;
    }

    .open-string {
        border-right: solid 4px black;
        height: 26px;
        min-width: 80px;
        display: flex;
        align-items: center;
        position: relative;
    }

    .string-box {
        display: flex;
        flex-direction: row;
    }

    .string {
        border-bottom: solid 1px silver;
        flex: 1;
    }

    .string.s1 {
        border-width: 1px;
    }

    .string.s2 {
        border-width: 1.5px;
    }

    .string.s3 {
        border-width: 2px;
    }

    .string.s4 {
        border-width: 2.5px;
    }

    .string.s5 {
        border-width: 3px;
    }

    .string.s6 {
        border-width: 3.5px;
    }

    .note-box {
        width: 48px;
        height: 20px;
        background-color: #428dfd;
        border-radius: 10px;
        color: white;
        text-align: center;
        position: absolute;
        left: 17px;
        padding-top: 2px;
    }
</style>