## Test Protocol

### Context

Usability testing of a community forum platform, conducted to identify functional issues, points of confusion, and opportunities to improve user experience.
Objectives

Evaluate users' ability to complete essential forum tasks
Identify technical blockers and critical bugs
Measure interface and navigation clarity
Collect improvement suggestions based on actual usage

### Features Tested

Thread creation with images
Reaction system (like/dislike)
Navigation between boards and threads
Content management (post deletion)
Moderation features (report)
Content search and sorting
Mobile experience

### Testing Conditions

Platform: Desktop and mobile (smartphone)
Connection: High-speed WiFi
Scenarios: Free usage with specific missions (create a post, interact with content, navigate between sections)

## Raw Data

### User 1

###### Scenario 1: Content Creation & Management

Task: Create a new thread with an image, then delete it

###### Thread Creation:

Action taken: Clicked "Post" button
number of click: 3
Result: Failure: Post was not created
Visual feedback: None
Error message: None
Time spent: N/A

###### Post Deletion (attempted on existing test post):

Action taken: Clicked visible "Delete" button
Result: Failure: Post remains displayed after click
System feedback: None (neither confirmation nor error)
Number of attempts: Multiple clicks

### User 2

###### Scenario 2: Social Interactions

Task: Like a post and verify the action persisted

###### Steps taken:

Clicked "like" button on a post
Observed counter  is not displayed
Refreshed the page
Checked counter again

###### Result: Failure -  Counter is not displayed after refresh

Persistence: Like was not saved

User perception: Uncertainty whether the action registered

### User 3

##### Scenario 3: Mobile Navigation & Discovery

Task: Navigate the forum and find specific content on mobile device

###### Board List Access:

Observation: Board list not visible on homepage mobile view

number of clik: 1

Compensatory action: Pinch and zoom required

Result: Partial failure - Element missing from mobile viewport

###### Thread Discovery:

Method used: Manual scrolling through thread list

Observation: No search bar or sorting options available

number of click: 2

Actions required: Extensive scrolling to find specific content

Result: Task possible but inefficient - Excessive time required

### Return Global Navigation:

Task: Return to board list from within a thread
Observation: No breadcrumb navigation visible
Solution found: Browser back button OR click on logo
Result: Success but degraded UX - 2 actions instead of 1 expected

### Additional Observations:

Report feature: Clicked "Report" button → No confirmation message → User uncertainty about submission
Board differentiation: Board names visible but no descriptions → Confusion about board purposes

## Analysis Report & Recommendations

### Summary by Severity

#### Critical     (Functional Blockage)


|Issue| Failure Rate| Impact|Recommendation
| --- | --- | --- | --- |
|Silent post creation failure| 100%| Critical - Core functionality unusable| Implement error handling system with explicit messages + server-side logging|
|Post deletion non-functional| 100%| Major - Loss of user control| Debug deletion handler + add visual confirmation|
|Like/dislike persistence |100%| Major - Social engagement impossible| Verify backend persistence + optimistic UI refresh|

### Medium (Degraded UX)
|Issue| Observed Impact|UX Score|Recommendation|
| --- | --- | --- | --- |
|Board list invisible on mobile|Mobile navigation blocked|⭐⭐☆☆☆|Implement responsive design with hamburger menu|
|No feedback on "Report"|User uncertainty|⭐⭐⭐☆☆|Add confirmation modal "Your report has been received"
|Missing breadcrumbs|+1 unnecessary click/action|⭐⭐⭐☆☆|Implement breadcrumb trail: Board > Thread
|Missing board descriptions|Thematic confusion|⭐⭐☆☆☆|Add descriptive subtitles for each board|

### Enhancement Opportunities
|Suggestion|Added Value|Priority|Estimated Effort|
| --- | --- | --- | --- |
|"Preview" button before publishing|Reduced formatting errors|Medium|Low|
|Thread sorting (Recent/Popular/Active)|Improved discoverability|High|Medium
|Search bar with filters|Significant time savings|High|Medium
|Overall mobile optimization|Mobile adoption|High|High|
### Key Insights

System feedback failure: 4 out of 8 tested features provide no user feedback (success or failure), creating confusion and frustration.
Major desktop/mobile gap: The mobile experience is fundamentally broken, suggesting absence of responsive testing.
Problematic content discoverability: Without search or sorting, users are forced into manual scrolling (UX anti-pattern).
Core functionalities non-operational: The 3 fundamental actions (create, react, delete) contain critical bugs that block normal forum usage.
