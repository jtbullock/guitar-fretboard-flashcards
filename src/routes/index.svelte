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
    let selectedFrets = musicScale.map( ( _, i ) => i );

    $:shouldShowNote = ( note, string ) =>
        revealNote &&
        musicNote.isSamePitch( quizNote.note, note ) && quizNote.string === string

    const setQuizNote = () => {
        revealNote = false;

        const string = quizConfig.mode === quizModes.SingleString ?
            quizConfig.string : jArray.getRandomElement( guitarStrings );

        const availableNotes =
            musicScale
                .map( ( _, i ) => (musicScale.indexOf( string ) + i) % musicScale.length )
                .filter( ( _, i ) => selectedFrets.includes( i ) )
                .map( noteIndex => musicScale[ noteIndex ] );

        quizNote = {
            string,
            note: selectRandomEnharmonic( jArray.getRandomElement( availableNotes ) )
        };
    }

    const getFretClass = ( fret ) => {
        if ( fret === 0 ) {
            return 'nut';
        }
        return "fret";
    }

    const getStringClass = ( fret, string ) => fret > 0 ? `string s${ string + 1 }` : 'open-string';

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
              on:endQuiz={() => isRunningQuiz=false}/>
{/if}

{#if !isRunningQuiz}
    <div style="display:flex; margin-bottom: 0.5em;">
        {#each musicScale as note, fretNumber}
            <div class="fret-selector">
                <input type="checkbox" bind:group={selectedFrets} name="Selected Frets" value={fretNumber}/>
            </div>
        {/each}
    </div>
{/if}

<div style="display: flex">

    {#each musicScale as note, fretNumber}

        <div class={getFretClass(fretNumber)}>

            {#if ([ 3, 5, 7, 9 ].includes( fretNumber ))}
                <div class="marker">

                    <span>&bull;</span>

                </div>
            {/if}

            <div class="string-box">

                {#each guitarStrings as string, stringNumber}

                    <div class={getStringClass(fretNumber, stringNumber)}>

                    </div>


                {/each}

            </div>

            <div class="note-container">
                {#each guitarStrings as string, stringNumber}
                    <div class="note">

                        {#if !isRunningQuiz || shouldShowNote( getNote( fretNumber, stringNumber ), string ) }
                            <div class="note-box">{getNote( fretNumber, stringNumber )}</div>
                        {/if}

                    </div>
                {/each}
            </div>
        </div>

    {/each}

</div>

<style>

    .note {
        height: 26px;
    }

    .marker {
        height: 170px;
        display: flex;
        align-items: center;
        position: absolute;
        top: -8px;
        padding-left: 34px;
        width: 44px;
        font-size: 2em;
    }

    .fret-selector {
        min-width: 81px;
        text-align: center;
    }

    .fret {
        border-right: solid 1px black;
        /*height: 26px;*/
        min-width: 80px;
        /*display: flex;*/
        /*align-items: center;*/
        position: relative;
    }

    .nut {
        border-right: solid 4px black;
        /*height: 26px;*/
        min-width: 80px;
        /*display: flex;*/
        /*align-items: center;*/
        position: relative;
    }

    .string-box {
        position: relative;
        top: -12px;
    }

    .note-container {
        position: absolute;
        top: 0;
        padding-left: 16px;
    }

    .open-string {
        flex: 1;
        height: 26px;
    }

    .string {
        border-bottom: solid 1px silver;
        flex: 1;
        height: 26px;
        box-sizing: border-box;
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
        /*position: absolute;*/
        /*left: 17px;*/
        padding-top: 2px;
    }
</style>