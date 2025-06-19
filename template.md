---
layout: content.html
title: KSoM - Template
full_width: true
---
  
<div class="main-full-width" id="main-content-start">
  

    <!-- Accordions with no links attached. (static-section class) -->
    <section class="static-section" id="research-overview">
        <div class="accordion-header">Static Accordion Format</div>
        
            <div style="margin-bottom: 1rem;">This paragraph has 1rem space below</div>
            <div>This is the paragraph with no space below. Usually the last paragraph in the static-accordion format.</div>
    
    </section>

    <!-- Clickable accordion (Clickable card, direct link to /research/areas, no modal, no 'more') -->
    <section id="research-areas-section-link" class="accordion-item" data-direct-link="true" data-learn-more-url="www.google.com">
        <div class="accordion-header" role="button" tabindex="0" aria-label="Clickable white accordion">Clickable White accordion</div>
        <div class="accordion-snippet">
            Provides the template for a clickable white card redirecting to Google.<span class="snippet-more-indicator"> ...more</span>
        </div>
    </section>

    <!-- While static accordion -->
    <section class="static-section default-bg">        
        <div class="accordion-content static-content">
        <div class="accordion-header">White static content</div>
            <p>This accordion allows you to place material in a white box without links.</p>

            <p>Key features</p>
            <ol>
                <li>The accordions are not clickable</li>
                <li>This has the following futher propoerties</li>
                ul>
                    <li>Nested listings taken care of</li>
                    <li>Text alignment addressed</li>
                </ul>
            </ol>
          </div>
    </section>

    <!-- Blue Clickable Accordion. -->
<section class="accordion-item highlight-card" id="admissions-highlight-card" data-direct-link="true" data-learn-more-url="www.google.com">
    <div class="accordion-header" role="button" tabindex="0" aria-label="Blue-clickable accordion">Blue clickable accordion</div>
    <div class="accordion-snippet">
        This blue accordion is clickable and redicts to www.google.com<span class="snippet-more-indicator"> ...more</span>
    </div>
</section>
    
</div>
