---
layout: content.html
title: KSoM - Template
full_width: true
---
  
<div class="main-full-width" id="main-content-start">
  

    <!-- Accordions with no links attached and without accordion-content class. (static-section class) -->
    <section class="static-section" id="accordion-no-links">
      
        <div class="accordion-header">Static Accordion (no background)</div>        
            <div style="margin-bottom: 1rem;">This paragraph has 1rem space below</div>
            <div>This is the paragraph with no space below. Usually the last paragraph in the static-accordion format.</div>
        </div>
    </section>

    

    <!-- Clickable accordion (Clickable card no modal) -->
    <section id="research-areas-section-link" class="accordion-item" data-direct-link="true" data-learn-more-url="www.google.com">
        <div class="accordion-header" role="button" tabindex="0" aria-label="Clickable white accordion with no modals">Clickable White accordion</div>
        <div class="accordion-snippet">
            Provides the template for a clickable white card redirecting to Google.<span class="snippet-more-indicator"> ...more</span>
        </div>
    </section>
    

    <!-- Static accordion with white background (Uses the static-content) -->
    <section class="static-section default-bg">        
        <div class="accordion-content static-content">
          <div class="accordion-header">Static accordion with white background</div>
            <p>This accordion allows you to place material in a white box without links.</p>

            <p>Key features</p>
            <ol>
                <li>The accordions are not clickable</li>
                <li>This has the following futher propoerties</li>
                <ul>
                    <li>Nested listings taken care of</li>
                    <li>Text alignment addressed</li>
                </ul>
            </ol>
          </div>
    </section>


    <!-- White accordion with modals -->
    <section id="White-accordion-with-modals" class="accordion-item" data-accordion-id="aboutKSoM" data-learn-more-url="[www.google.com](https://ksom.res.in/)" data-modal-opener="true">
      <div class="accordion-header" role="button" tabindex="0" aria-haspopup="dialog" aria-label="Open details in this accordion" aria-expanded="false" aria-controls="accordion-content-modalAccordion">Accodions which open modals</div>
      <div class="accordion-snippet">
        This portion is for the snippets. This will be visible in the accordion<span class="snippet-more-indicator"> ...more</span>
      </div>
      <div class="accordion-content" style="display: none;" id="accordion-content-modalAccordion">
        <p>This is content which will go into the modal.</p>
      </div>
  </section>

  <!-- Blue Clickable Accordion. -->
  <section class="accordion-item highlight-card" id="admissions-highlight-card" data-direct-link="true" data-learn-more-url="www.google.com">
      <div class="accordion-header" role="button" tabindex="0" aria-label="Blue-clickable accordion">Blue clickable accordion</div>
      <div class="accordion-snippet">
          This blue accordion is clickable and redicts to www.google.com<span class="snippet-more-indicator"> ...more</span>
      </div>
  </section>


  <!-- Blue static Accordion -->
  <section class="static-section static-blue-section" id="blue-static-accordions">
    <div class="accordion-content static-content">
      <div class="accordion-header">Blue static content</div>
          <p>This accordion allows you to place material in a Blue box without links.</p>

          <p>Key features</p>
          <ol>
              <li>The accordions are not clickable</li>
              <li>This has the following futher propoerties</li>
              <ul>
                  <li>Nested listings taken care of</li>
                  <li>Text alignment addressed</li>
              </ul>
          </ol>
        </div>
      </div>
  </section>
    
</div>
