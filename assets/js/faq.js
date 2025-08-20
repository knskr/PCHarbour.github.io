$(document).ready(function () {
    const faqData = [
        { question: "Where are you based?", answer: "We are based in Belgrade, Serbia." },
        { question: "How long does the delivery take?", answer: "Delivery usually takes 3–5 business days, with special cases being holidays and possible stock shortages." },
        { question: "Can I customize my PC build?", answer: "Yes, you can add or change components depending on availability." },
        { question: "Do you offer warranty on PCs?", answer: "All our PCs come with a 2-year warranty." },
        { question: "Do you offer any discounts?", answer: "Of course! Holiday, BTS, special events, we even have discounts for new and regular customers!" },
        { question: "What if my PC arrived damaged or not working at all?", answer: "Our technicians always test the PCs, while our packaging teams make sure that the PCs do not get damaged in transport and will also take a picture of how the PC should arrive. Any tampering and/or damage should be immediately reported, and we will resolve the issue as soon as possible." },
        { question: "Are refunds possible?", answer: "Refunds are possible on components. In extreme cases, you should refer to the question above." },
        { question: "Do you do complete setups?", answer: "No, we only make configurations you see on our website and add any changes, if any are mentioned at all." },
        { question: "Does my PC come with any proprietary programs?", answer: "PCs that we make come with a preinstalled OS, mostly Windows 11 or Windows 10, but you can also add any other programs or different operating systems. However, the price will increase with the amount of programs you add, as we follow prices shown at the time." },
    ];

    const $faqContainer = $("#faq-container");
    faqData.forEach(faq => {
        const $item = $("<div>").addClass("faq-item");
        const $question = $("<h5>").addClass("faq-question").text(faq.question);
        const $answer = $("<p>").addClass("faq-answer").text(faq.answer);

        $item.append($question).append($answer);
        $faqContainer.append($item);
    });


    $(".faq-question").on("click", function () {
        const $answer = $(this).next(".faq-answer");


        $(".faq-answer").not($answer).slideUp(200);


        $answer.slideToggle(200);
    });
});
