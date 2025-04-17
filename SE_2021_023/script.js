document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.book-page.page-right');
    const pageButtons = document.querySelectorAll('.nextprev-btn');
    const totalPages = pages.length;
    console.log(totalPages);
    let currentPage = 0;
    let isAnimating = false;

    function initPages() {
        pages.forEach((page, index) => {
            page.style.zIndex = totalPages - index;
            console.log(page.style.zIndex);
            if(index > 0) {
                page.style.display = 'none';
            }
            page.classList.remove('turn');
        });
    }
    initPages();

    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const isBack = this.classList.contains('back');
            console.log(isBack);
            turnPage(isBack);
        });
    });

   
    function turnPage(isBack) {
        const targetPage = isBack ? currentPage - 1 : currentPage + 1;
        const currentPageEl = pages[currentPage];
        const targetPageEl = pages[targetPage];

        if(isBack) {
           
            const targetPage = currentPage - 1;
            const currentPageEl = pages[currentPage];
            const targetPageEl = pages[targetPage];
            
            if(targetPageEl === undefined) {
                const targetPageEl = currentPageEl;
                targetPageEl.style.display = 'flex';
                targetPageEl.style.zIndex = totalPages + targetPage;
                currentPageEl.classList.remove('turn');
                setTimeout(() => {
                    currentPageEl.style.zIndex = totalPages - currentPage;
                    currentPage = targetPage + 1;
                    console.log(currentPage);
                }, 800);
            }
            
            targetPageEl.style.display = 'flex';
            targetPageEl.style.zIndex = totalPages + targetPage;
            currentPageEl.classList.remove('turn');
            
            setTimeout(() => {
                currentPageEl.style.zIndex = totalPages - currentPage;
                currentPage = targetPage;
                console.log(currentPage);
            }, 800);
        } else {
            if(targetPage === totalPages) {
                
                targetPageEl.style.display = 'flex';
                targetPageEl.style.zIndex = totalPages + targetPage + 1;
                currentPageEl.classList.add('turn');
                
                setTimeout(() => {
                    currentPage = targetPage;
                    isAnimating = false;
                }, 800);
            } else {
                targetPageEl.style.display = 'flex';
                targetPageEl.style.zIndex = totalPages + targetPage;
                currentPageEl.classList.add('turn');
                
                setTimeout(() => {
                    currentPage = targetPage;
                }, 800);
            }
        }
    }

   
    function setupContactButton() {
        const contactBtn = document.querySelector('.contact-me');

        if (contactBtn) {
            contactBtn.addEventListener('click', function (e) {
                e.preventDefault();
                if (isAnimating) return;

                const lastPageIndex = totalPages - 1;
                isAnimating = true;

                function turnToLast() {
                    if (currentPage < lastPageIndex) {
                        turnPage(false);
                        setTimeout(turnToLast, 850); // delay between page turns
                    } else {
                        isAnimating = false;
                    }
                }

                turnToLast();
            });
        }
    }
    setupContactButton();
    
const backProfileBtn = document.querySelector(".back-profile");
if (backProfileBtn) {
    backProfileBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (isAnimating) return;

        isAnimating = true;

        function turnToFirst() {
            if (currentPage >= 0) {
                turnPage(true);
                setTimeout(turnToFirst, 850); // delay between turns
            } else {
                isAnimating = false;
            }
        }

        turnToFirst();
    });
}



    document.querySelector(".btn").addEventListener("click", (e) => {
        e.preventDefault();
        
        try {
            fetch('Aswini-CV.pdf')
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Aswini_CV.pdf';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                })
                .catch(() => {
                    const link = document.createElement('a');
                    link.href = 'Aswini-CV.pdf';
                    link.download = 'Aswini_CV.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Failed to download CV. Please try again or contact me directly.');
        }
    });
});