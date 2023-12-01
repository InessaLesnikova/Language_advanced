$(document).ready(function () {
    let words = {
        easy: [
            { term: "book", translation: "книга" },
            { term: "sky", translation: "небо" },
			{ term: "ocean", translation: "океан" },
			{ term: "mountain", translation: "гора" },
			{ term: "fire", translation: "вогонь" },
        ],
        medium: [
            { term: "blossom", translation: "цвітіння" },
            { term: "luminary", translation: "світило" },
			{ term: "firmament", translation: "твердь" },
			{ term: "cumulus", translation: "купчасті" },
			{ term: "crimson", translation: "малиновий" },
        ],
        hard: [
            { term: "vermilion", translation: "багряний" },
            { term: "cumulonimbus", translation: "кумулонімб" },
            { term: "conflagration", translation: "пожежа" },
            { term: "pinnacle", translation: "вершина" },
            { term: "quintessence", translation: "квінтесенція" },
        ],
    };
    let currentIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let isTranslationVisible = false;
    let currentWords = [];
    function nextword() {
        if (currentIndex < currentWords.length) {
            $("#box").text(currentWords[currentIndex].term);
            $("#userInput").val("");
			$("#step").text(currentIndex + 1 + " of " + currentWords.length);
        } else {
            result();
        }
    }
    function result() {
        let accuracy = (correctCount / currentWords.length) * 100;
        let message = `Your accuracy is ${accuracy.toFixed(2)}%.`;
        setTimeout(function () {
            alert(message);
            currentIndex = 0;
            correctCount = 0;
            incorrectCount = 0;
            $("#correctCount").text(correctCount);
            $("#incorrectCount").text(incorrectCount);
            $("#step").text(currentIndex + 1);
            nextword();
        },100); 
    }
    $("#userInput").on("keyup", function (event) {
        if (event.keyCode === 13) {
            let userTranslation = $("#userInput").val().trim().toLowerCase();
            let correctTranslation = currentWords[currentIndex].translation.toLowerCase();
            if (userTranslation === correctTranslation) {
                correctCount++;
            } else {
                incorrectCount++;
            }
            $("#correctCount").text(correctCount);
            $("#incorrectCount").text(incorrectCount);
            currentIndex++;
            nextword();
        }
    });
    $("#difficulty").on("change", function () {
        let difficulty = $(this).val();
        currentWords = words[difficulty];
        currentWords.sort(() => Math.random() - 0.5);
        currentIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        $("#correctCount").text(correctCount);
        $("#incorrectCount").text(incorrectCount);
        $("#step").text(currentIndex + 1 + " of " + currentWords.length); 
        nextword();
    });
    $("#difficulty").val("easy").trigger("change");
});
