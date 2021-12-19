<script type="text/javascript">

const notes = ['A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭' ];

const guitarStrings = ['E', 'A', 'D', 'G', 'B', 'E'].reverse();

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
</style>

{#each guitarStrings as string, stringNumber}

    <div class="string-box">

    {#each notes as note, fretNumber}

        <div class={getFretClass(fretNumber)}>

            <div class={getStringClass(fretNumber, stringNumber)}>

            </div>

            <div class="note-box">{getNote(fretNumber, stringNumber)}</div>

        </div>

    {/each}

    </div>

{/each}