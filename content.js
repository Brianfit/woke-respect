// console.log('Content.js reporting for duty');

function replaceText(node) {
    const re = /\bwoke\b/gi;
//     console.log('Checking node:', node); // Log the current node being checked
    if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.match(re)) {
            console.log('Text before replacement:', node.textContent); // Log text before replacement
            node.textContent = node.textContent.replace(re, match => {
                // Preserve the case
                return match.charAt(0) === 'W' ? 'Respect for other people' : 'respect for other people';
            });
//             console.log('Text after replacement:', node.textContent); // Log text after replacement
        }
    } else {
        for (const child of node.childNodes) {
            replaceText(child);
        }
    }
}

function startReplacement() {
//     console.log('Starting replacement');
    replaceText(document.body);
    // Observe for changes in the document
    const observer = new MutationObserver((mutations) => {
//         console.log('Mutation observed', mutations); // Log the mutations observed
        mutations.forEach((mutation) => {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach((newNode) => {
                    replaceText(newNode);
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

if (document.readyState === 'loading') {
    // Still loading, wait for the DOMContentLoaded event
    window.addEventListener('DOMContentLoaded', startReplacement);
} else {
    // DOMContentLoaded has already fired, call startReplacement immediately
    startReplacement();
}
