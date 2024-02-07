// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

      // Get current date and time
      const currentDate: Date = new Date();

      // Format the date and time
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'EST' // Change this to your desired time zone
      };

      const formattedDateTime: string = currentDate.toLocaleString('en-US', options);

      // Get current user 
      const user = figma.currentUser?.name

      // Create a new frame
      const newFrame = figma.createFrame();
      
      newFrame.name = `Timestamp`; // Set frame name

      // Set frame properties if needed
      newFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]; // Set fill color
      newFrame.cornerRadius = 4; // Set corner radius
      newFrame.strokeWeight = 2; // Set stroke weight
      newFrame.strokes = [{type: 'SOLID', color: { r: 0, g: 0, b: 0 }}]; // Red stroke

      
      // Apply auto layout
      newFrame.layoutMode = "VERTICAL"; // Change to "HORIZTONAL" if you want horizontal layout
      newFrame.primaryAxisAlignItems = "MIN"; // Adjust as needed
      newFrame.counterAxisAlignItems = "MIN"; // Adjust as needed
      newFrame.primaryAxisSizingMode = "AUTO";
      newFrame.counterAxisSizingMode = "AUTO";
      newFrame.itemSpacing = 4; // Adjust spacing between items as needed
      newFrame.horizontalPadding = 10; // Padding 
      newFrame.verticalPadding = 10; // Padding
      newFrame.maxWidth = 200;

        
      //Create Timestamp
      (async () => {
        const text = figma.createText()
        const note = figma.createText()

        // Load the font in the text node before setting the characters
        await figma.loadFontAsync({ family: "Inter", style: "Regular" })
        text.characters = `${user} ${formattedDateTime}`
        note.characters = `Put your note here`

        // Set font sizes and colors
        text.fontSize = 10
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: .50, }]
        note.resize(180, 50)
        note.textAutoResize = 'HEIGHT'
        note.fontSize = 12

        // Append the text node to the frame
        newFrame.appendChild(text);
        newFrame.appendChild(note);

        
        // Create a NEW LINE
        const line = figma.createLine();
        line.name = 'Timestamp Line'

        line.strokeWeight = 1; // Adjust the stroke weight as needed
        line.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]; // Set line color

         // Add an arrowhead to the end of the line
         line.strokeCap = 'ARROW_EQUILATERAL' ; // Set line cap to arrow
         line.strokeAlign = 'OUTSIDE'; // Align the arrow outside the line
        

        // Append that line to that frame
        //newFrame.appendChild(line);

         
 
      

        // Append the new frame to the current page
        figma.currentPage.appendChild(newFrame);    
        
        // Get the current viewport position
        const viewportPosition = figma.viewport.center;

        // Set the position of the frame near the cursor
        newFrame.x = viewportPosition.x - newFrame.width / 2;
        newFrame.y = viewportPosition.y - newFrame.height / 2;

        // Set the position of the line near the cursor
        line.x = viewportPosition.x - line.width / 15;
        line.y = viewportPosition.y - line.height / 15;

        // Center the viewport on the new frame
        figma.viewport.scrollAndZoomIntoView([newFrame]);


        // Group all the things!! 
        const group = figma.group([newFrame, line], figma.currentPage);
        group.name = 'Timestamp'; // Set the name of the group

        // Select the newly created group
        figma.currentPage.selection = [group];

        
      })().then(() => {
        
      // Font has loaded, you can now safely close the plugin
        figma.closePlugin();/*
        }).catch((error: any) => {
        console.error("Error loading font:", error);*/
        }
        )

      
      