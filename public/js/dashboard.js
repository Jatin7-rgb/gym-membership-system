// Dashboard functionality

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
const user = JSON.parse(localStorage.getItem('user') || '{}');

// Set user name in welcome card
document.addEventListener('DOMContentLoaded', () => {
  if (user && user.firstName) {
    document.getElementById('userName').textContent = user.firstName;
  }
  loadMembershipInfo();
  loadFitnessProfile();
});

async function loadMembershipInfo() {
  try {
    const response = await fetch('/api/members/membership', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const membership = await response.json();
      document.getElementById('membershipStatus').textContent = membership.planName || 'Active';
      
      const endDate = new Date(membership.endDate);
      document.getElementById('membershipEnd').textContent = `Expires: ${endDate.toLocaleDateString()}`;
    } else {
      document.getElementById('membershipStatus').textContent = 'No Active Plan';
      document.getElementById('membershipEnd').textContent = 'Upgrade to activate';
    }
  } catch (error) {
    console.error('Error loading membership:', error);
  }
}

async function loadFitnessProfile() {
  try {
    const response = await fetch('/api/members/fitness-profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const profile = await response.profile();
      
      // Update stat cards
      if (profile.fitnessGoal) {
        const goalMap = {
          'weight_loss': 'Lose Weight',
          'muscle_gain': 'Build Muscle',
          'endurance': 'Increase Endurance',
          'overall_fitness': 'Overall Fitness'
        };
        document.getElementById('fitnessGoal').textContent = goalMap[profile.fitnessGoal] || 'Not Set';
      }

      if (profile.weight) {
        document.getElementById('currentWeight').textContent = profile.weight + ' kg';
        
        // Calculate BMI
        if (profile.height) {
          const heightInMeters = profile.height / 100;
          const bmi = (profile.weight / (heightInMeters * heightInMeters)).toFixed(1);
          document.getElementById('weightInfo').textContent = `BMI: ${bmi}`;
        }
      }

      if (profile.height) {
        document.getElementById('currentHeight').textContent = profile.height + ' cm';
      }
    }
  } catch (error) {
    console.error('Error loading fitness profile:', error);
  }
}

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.dashboard-section').forEach(section => {
    section.style.display = 'none';
  });

  // Show selected section
  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = 'block';
    
    // Load section-specific data
    if (sectionId === 'fitness') {
      loadFitnessProfileSection();
    } else if (sectionId === 'attendance') {
      loadAttendanceSection();
    }
  }

  // Update nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('nav-active');
  });
}

async function loadFitnessProfileSection() {
  const content = document.getElementById('profileContent');
  content.innerHTML = 'Loading...';

  try {
    const response = await fetch('/api/members/fitness-profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const profile = await response.json();

      const goalMap = {
        'weight_loss': 'Lose Weight',
        'muscle_gain': 'Build Muscle',
        'endurance': 'Increase Endurance',
        'overall_fitness': 'Overall Fitness'
      };

      let goalsHtml = '';
      if (profile.goals) {
        const goalsList = profile.goals.split(', ');
        goalsHtml = '<h4>Your Goals:</h4><ul>';
        goalsList.forEach(goal => {
          const goalDisplay = goal.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          goalsHtml += `<li>✓ ${goalDisplay}</li>`;
        });
        goalsHtml += '</ul>';
      }

      content.innerHTML = `
        <div class="profile-details">
          <div class="profile-item">
            <h4>Personal Information</h4>
            <p><strong>Age:</strong> ${profile.age || 'Not set'} years</p>
            <p><strong>Height:</strong> ${profile.height || 'Not set'} cm</p>
            <p><strong>Weight:</strong> ${profile.weight || 'Not set'} kg</p>
          </div>

          <div class="profile-item">
            <h4>Gym Experience</h4>
            <p><strong>Experience Level:</strong> ${profile.gymExperience ? profile.gymExperience.replace('_', ' ').toUpperCase() : 'Not set'}</p>
            <p><strong>Years of Training:</strong> ${profile.gymExperienceYears || '0'} years</p>
          </div>

          <div class="profile-item">
            <h4>Primary Fitness Goal</h4>
            <p><strong>Goal:</strong> ${goalMap[profile.fitnessGoal] || 'Not set'}</p>
          </div>

          <div class="profile-item">
            ${goalsHtml}
          </div>

          ${profile.healthConditions ? `
            <div class="profile-item">
              <h4>Health Information</h4>
              <p><strong>Conditions/Injuries:</strong> ${profile.healthConditions}</p>
            </div>
          ` : ''}
        </div>
      `;
    } else {
      content.innerHTML = '<p>No fitness profile found. <a href="/questionnaire">Complete your assessment</a></p>';
    }
  } catch (error) {
    content.innerHTML = '<p>Error loading fitness profile</p>';
    console.error('Error:', error);
  }
}

async function loadAttendanceSection() {
  const content = document.getElementById('attendanceContent');
  content.innerHTML = 'Loading attendance records...';

  try {
    // Note: This requires an API endpoint that we can add later
    content.innerHTML = `
      <div class="attendance-stats">
        <h3>Attendance Coming Soon</h3>
        <p>We're building the attendance tracking feature. You'll be able to see your gym visit history here soon!</p>
      </div>
    `;
  } catch (error) {
    content.innerHTML = '<p>Error loading attendance records</p>';
  }
}

async function checkIn() {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('/api/members/checkin', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();

    if (response.ok) {
      alert('✓ Checked in successfully at ' + new Date(data.checkInTime).toLocaleTimeString());
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    alert('Check-in failed. Please try again.');
  }
}

async function checkOut() {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('/api/members/checkout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();

    if (response.ok) {
      alert('✓ Checked out successfully at ' + new Date(data.checkOutTime).toLocaleTimeString());
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    alert('Check-out failed. Please try again.');
  }
}
