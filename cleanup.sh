# Rename folders to PascalCase
mv src/components/navigation-bar src/components/NavigationBar
mv src/components/profile-view src/components/ProfileView

# Rename files inside those folders to PascalCase
mv src/components/NavigationBar/navigation-bar.jsx 
src/components/NavigationBar/NavigationBar.jsx
mv src/components/ProfileView/profile-view.jsx 
src/components/ProfileView/ProfileView.jsx

# Remove leftover CRA files you don't need
rm src/App.js
rm src/App.test.js
rm src/logo.svg
rm src/reportWebVitals.js
rm src/setupTests.js
rm src/index.css

# Optional: If you're sure __old_index.html is no longer needed, you can 
also remove it:
rm public/__old_index.html

# Stage the changes for Git
git add .

# Commit with clear message
git commit -m "Cleanup: rename components and remove unused files"

# Push to your feature branch (assuming you're still on 
feature/react-router)
git push origin feature/react-router

