<script type="text/javascript">

const notes = ['A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭' ];

const guitarStrings = ['E', 'A', 'D', 'G', 'B', 'E'].reverse();

const quizModes = {
    AllStrings: 'all-strings',
    SingleString: 'single-string'
};

let quizString = guitarStrings[0];

let quizMode = quizModes.AllStrings;

let isRunningQuiz = false;

let quizNote = { string: '', note: '' };

let revealNote = false;

function shouldShowNote(note, string)
{
    console.log("SSN");
    return revealNote && quizNote.note === note && quizNote.string === string;
}

function setQuizNote()
{
    var string = quizMode === quizModes.SingleString ?
        quizString : guitarStrings[Math.floor(Math.random() * guitarStrings.length)];

    var note = notes[Math.floor(Math.random() * notes.length)];

    quizNote = { string, note };

    console.log(quizNote);
}

function getFretClass(fret)
{
    if(fret === 0)
    {
        return "open-string"
    }
    else if([3, 5, 7, 9].includes(fret))
    {
        return "fret marker";
    }

    return "fret";
}

function getStringClass(fret, string)
{
    if(fret > 0)
    {
        return `string s${string + 1}`
    }

    return '';
}

function getNote(fret, string)
{
    var firstNoteIndex = notes.indexOf(guitarStrings[string]);

    return notes[(firstNoteIndex + fret) % notes.length];
}

function startQuiz()
{
    isRunningQuiz = true;
    setQuizNote();
}

</script>

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
        display:flex;
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

    .option-box {
        border: solid 1px lightgray;
        border-radius: 6px;
        box-shadow: lightgray 1px 1px 3px;
        margin-bottom: 1em;
        width: 400px;
        padding: 0.5em;
    }
</style>

{#if !isRunningQuiz}
<div class="option-box">
    <strong>Quiz Mode:</strong>

    <label>
        <input type=radio bind:group={quizMode} name="scoops" value={quizModes.AllStrings} />
        All Strings
    </label>

    <label>
        <input type=radio bind:group={quizMode} name="scoops" value={quizModes.SingleString} />
        Single String
    </label>

    {#if quizMode === quizModes.SingleString}
    <select bind:value={quizString}>
        {#each guitarStrings as string}
            <option value={string}>
                {string}
            </option>
        {/each}
    </select>
    {/if}

    <br />
    <br />

    <button type="button" on:click={startQuiz}>Start!</button>
</div>
{:else }
<div class="option-box">
    {quizNote.note} on {quizNote.string} string
    <br />
    <!--<button type="button" on:click={() => revealNote = true}>Check</button>-->
    <button type="button" on:click={() => setQuizNote()}>Next</button>
    <br />
    <br /><button type="button" on:click={() => isRunningQuiz=false}>End</button>
</div>
{/if}

{#each guitarStrings as string, stringNumber}

    <div class="string-box">

    {#each notes as note, fretNumber}

        <div class={getFretClass(fretNumber)}>

            <div class={getStringClass(fretNumber, stringNumber)}>

            </div>

            {#if !isRunningQuiz || shouldShowNote(note, string) }
                <div class="note-box">{getNote(fretNumber, stringNumber)}</div>
            {/if}
        </div>

    {/each}

    </div>

{/each}