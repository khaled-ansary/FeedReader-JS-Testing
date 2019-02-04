/* feedreader.js
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* The test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("Test URL defined and not empty ", function() {
            allFeeds.forEach(function(feed) {
              expect(feed.url).toBeDefined();
              expect(feed.url.length).not.toBe(0);
            });
        });


        /* The test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {

        // declare variable to use body and menu-icon-link
        const body = document.body;
        const menuButton = document.querySelector(".menu-icon-link");
        /* The test ensures that the menu element is
         * hidden by default. It analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("body has initially hidden'", function() {
            expect(body.classList.contains("menu-hidden")).toBe(true);
        });

         /* The test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it("should display the menu when click the menu icon and hide it when click again", function() {
            menuButton.click();
            expect(body.classList.contains("menu-hidden")).toBe(false);
      
            menuButton.click();
            expect(body.classList.contains("menu-hidden")).toBe(true);
          });
    });    
    /* a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {

        /* The test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it("contain at least one feed", function() {
            expect(document.querySelectorAll(".feed .entry").length).toBeGreaterThan(0);
        });
    });    
    /* a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
       
        /* The test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
          */
        let initFeed; 
        let newFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                initFeed = document.querySelector(".feed").innerHTML;
                done();
            });
        });

        it("change the feed content", function(done) { 
            loadFeed(1, function() {        
                newFeed = document.querySelector(".feed").innerHTML;
                expect(initFeed).not.toBe(newFeed);
                done();
            });
        });
    });
}());
