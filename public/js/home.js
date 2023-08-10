// ChatGPT generated this sentences array for me.
const sentences = [
    "Unleash your passion for technology and innovation.",
    "Dive into the digital universe with us, where every pixel holds a story waiting to be explored.",
    "Discover the latest tech trends, unearth hidden gems, and join the conversation that shapes tomorrow's digital landscape.",
    "Whether you're a code whisperer or a tech enthusiast, Just Blog It is your portal to the ever-evolving world of bytes and circuits.",
    "Join our community of tech enthusiasts and stay up-to-date with the latest breakthroughs.",
    "Explore the intersection of creativity and technology in our diverse range of articles.",
    "Unlock your curiosity and expand your horizons with our insightful tech content.",
    "Embark on a journey through the digital realm and uncover the possibilities that await.",
    "Turn your passion for tech into impactful stories that resonate with our global audience.",
    "Elevate your understanding of technology and its influence on the modern world through our engaging content."
];

function setRandomSentences() {
    const sentenceElement = document.getElementById("changingSentence");
    if (!sentenceElement) return;

    const shuffled = sentences.slice().sort(() => 0.5 - Math.random());

    sentenceElement.textContent = shuffled[0];
}

document.addEventListener("DOMContentLoaded", () => {
    setRandomSentences();

    const postContainers = document.querySelectorAll(".post");

    postContainers.forEach(postContainer => {
        postContainer.addEventListener("click", async () => {
            const postId = postContainer.dataset.postId;
            const response = await fetch(`/post/${postId}`);
            const postData = await response.json();

            if (postData) {
                postContainer.innerHTML = `
                    <h2>${postData.title}</h2>
                    <p>Author: ${postData.author}</p>
                    <p>Created On: ${postData.createdAt}</p>
                    <p>${postData.content}</p>
                `;
            }
        });
    });
});