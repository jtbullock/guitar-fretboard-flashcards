<script>
    import {quizModes} from "$lib/quiz-modes.js";
    import {guitarStrings} from "$lib/music.js";

    import { createEventDispatcher } from 'svelte';

    let quizMode = quizModes.AllStrings;
    let quizString = guitarStrings[0];

    const dispatch = createEventDispatcher();
    const start = () => dispatch('start', {mode: quizMode, string: quizString});
</script>

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

    <button type="button" on:click={start}>Start!</button>
</div>