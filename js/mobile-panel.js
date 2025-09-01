// Mobile panel toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("Mobile panel script loaded");
    
    // Function to initialize mobile panel
    function initMobilePanel() {
        console.log("Initializing mobile panel");
        const panel = document.getElementById('panel');
        
        if (!panel) {
            console.error("Panel element not found!");
            return;
        }
        
        // Create toggle button with text content
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'panel-toggle';
        toggleBtn.textContent = "×"; // Add actual text content
        toggleBtn.setAttribute('aria-label', 'Hide job panel');
        toggleBtn.style.display = 'block'; // Ensure it's visible
        
        // Add button to the body instead of the panel for better positioning
        document.body.appendChild(toggleBtn);
        console.log("Toggle button added to panel");
        
        // Toggle panel visibility
        toggleBtn.addEventListener('click', function(e) {
            console.log("Toggle button clicked");
            e.preventDefault(); // Prevent any default behavior
            document.body.classList.toggle('panel-hidden');
            
            // Force layout recalculation to fix any spacing issues
            const map = document.getElementById('map');
            
            // Update button text based on state
            if (document.body.classList.contains('panel-hidden')) {
                toggleBtn.textContent = "☰";
                toggleBtn.setAttribute('aria-label', 'Show job panel');
                
                // Force map to take full width
                if (window.innerWidth <= 768) {
                    map.style.width = '100%';
                    // Trigger browser reflow
                    void map.offsetWidth;
                }
            } else {
                toggleBtn.textContent = "×";
                toggleBtn.setAttribute('aria-label', 'Hide job panel');
                panel.scrollTop = 0;
                
                // Reset map width
                if (window.innerWidth <= 768) {
                    map.style.width = '100%';
                }
            }
            
            // Trigger resize event for map to update
            window.dispatchEvent(new Event('resize'));
        });
    }
    
    // Initialize on load and also when orientation changes
    initMobilePanel();
    
    // Also reinitialize when orientation changes
    window.addEventListener('orientationchange', function() {
        // Short delay to let the orientation change complete
        setTimeout(initMobilePanel, 300);
    });
});
