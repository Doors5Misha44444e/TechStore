document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver(() => {
        addProductCardAnimations();
    });

    observer.observe(document.getElementById('recommendedGrid'), {
        childList: true,
        subtree: true
    });

    observer.observe(document.getElementById('searchGrid'), {
        childList: true,
        subtree: true
    });

    addProductCardAnimations();
});

function addProductCardAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        const addBtn = newCard.querySelector('.add-to-cart-btn');

        newCard.addEventListener('mouseenter', function(e) {
            if (!this.classList.contains('product-card-animated')) {
                this.classList.add('product-card-animated');
                if (addBtn && !addBtn.disabled) {
                    addBtn.style.animation = 'pulse 0.6s ease-in-out';
                    const shine = document.createElement('div');
                    shine.style.cssText = `
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
                        animation: shimmer 0.6s ease-in-out;
                        pointer-events: none;
                    `;
                    addBtn.style.position = 'relative';
                    addBtn.style.overflow = 'visible';
                    addBtn.appendChild(shine);
                    
                    setTimeout(() => shine.remove(), 600);
                }
            }
        });

        newCard.addEventListener('mouseleave', function() {
            this.classList.remove('product-card-animated');
        });
    });
}

if (!document.getElementById('product-animations-style')) {
    const style = document.createElement('style');
    style.id = 'product-animations-style';
    style.textContent = `
        @keyframes shimmer {
            0% {
                transform: translateX(-100%) translateY(-100%);
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateX(100%) translateY(100%);
                opacity: 0;
            }
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }

        .product-card {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .product-card:hover {
            animation: none;
        }

        .product-card .add-to-cart-btn {
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .product-card .add-to-cart-btn::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: none;
        }

        .product-card:hover .add-to-cart-btn::after {
            animation: shine-wave 0.6s ease-in-out;
        }

        @keyframes shine-wave {
            0% {
                left: -100%;
            }
            100% {
                left: 100%;
            }
        }
    `;
    document.head.appendChild(style);
}
