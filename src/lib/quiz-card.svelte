<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import { onMount } from 'svelte';

    onMount( () => {
        document.addEventListener( 'keydown', e => {
            switch ( e.code ) {
                case 'Space':
                    nextNoteCountDown();
                    break;
            }
        } );
    } );

    export let quizNote = {note: '', string: ''}
    let isTransitioningToNextNote = false;
    let countDown = 3;

    const nextNoteCountDown = () => {
        isTransitioningToNextNote = true;
        revealNote();

        setTimeout(() => {
            countDown = 2;

            setTimeout(() => {
                countDown = 1;

                setTimeout(() => {
                    isTransitioningToNextNote = false;
                    countDown = 3;
                    nextNote();
                }, 600);
            }, 600);
        }, 600);
    }

    const revealNote = () => dispatch('revealNote');
    const nextNote = () => dispatch('nextNote');
    const endQuiz = () => dispatch('endQuiz');
</script>

<div class="option-box">
    <div class="prompt">
        {#if isTransitioningToNextNote}
            <strong>{countDown}...</strong>
        {:else}
            <strong>{quizNote.note}</strong> on <strong>{quizNote.string}</strong> string
        {/if}
    </div>
    <button type="button" on:click={revealNote}>Reveal</button>
    <button type="button" on:click={nextNoteCountDown}>Next</button>
    <br/>
    <br/>
    <button type="button" on:click={endQuiz}>End</button>
</div>

<style>
    .prompt {
        font-size: 2em;
    }
</style>