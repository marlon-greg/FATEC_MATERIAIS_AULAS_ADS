
document.addEventListener('DOMContentLoaded', () => {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const total = slides.length;
    let current = 0;
    let revIdx = {};
    
    document.getElementById('tot').textContent = total;
    
    function getRevs(slide) { return Array.from(slide.querySelectorAll('.rev')); }
    
    function revealNext() {
        const slide = slides[current];
        const id = slide.id;
        const revs = getRevs(slide);
        if (!revs.length) return false;
        
        const idx = revIdx[id] || 0;
        if (idx >= revs.length) return false;
        
        const el = revs[idx];
        el.classList.add('rev-done');
        revIdx[id] = idx + 1;
        return true;
    }
    
    function goTo(n) {
        if (n < 0 || n >= total) return;
        slides[current].classList.remove('active');
        slides[current].classList.add('out');
        setTimeout(() => slides[current].classList.remove('out'), 460);
        
        current = n;
        slides[current].classList.add('active');
        
        const inner = slides[current].querySelector('.s-inner');
        if (inner) inner.scrollTop = 0;
        
        document.getElementById('cur').textContent = current + 1;
        document.getElementById('progress-bar').style.width = ((current + 1) / total * 100) + '%';
    }
    
    const advance = () => { if (!revealNext()) goTo(current + 1); };
    const back = () => goTo(current - 1);
    
    document.getElementById('btn-next').addEventListener('click', advance);
    document.getElementById('btn-prev').addEventListener('click', back);
    
    document.addEventListener('keydown', e => {
        if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); advance(); }
        if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); back(); }
    });
    
    document.getElementById('progress-bar').style.width = (1 / total * 100) + '%';
});
