
document.addEventListener('DOMContentLoaded', function() {
    // Page Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            const targetPage = this.getAttribute('data-page');
            pages.forEach(page => page.classList.remove('active'));
            navLinks.forEach(link => link.classList.remove('active'));
            document.getElementById(targetPage).classList.add('active');
            this.classList.add('active');
            window.scrollTo(0, 0);
        });
    });

    // Book Now buttons & modal logic
    const bookNowButtons = document.querySelectorAll('.book-now');
    const bookingModal = document.getElementById('bookingModal');
    const closeBookingModal = document.getElementById('closeBookingModal');
    const bookingTitle = document.getElementById('bookingTitle');
    const bookingDescription = document.getElementById('bookingDescription');
    const bookingSummary = document.getElementById('bookingSummary');
    const bookingDetails = document.getElementById('bookingDetails');
    const bookingTotal = document.getElementById('bookingTotal');
    const completeBooking = document.getElementById('completeBooking');
    const whatsappRedirect = document.getElementById('whatsappRedirect');
    let currentAdventure = null;

    const adventures = {
        'classic-african': { name: 'Classic African Safari', duration: '7 Days', price: 'KES 285,000', groupSize: '6-12' },
        'mountain-trekking': { name: 'Maasai Mara Park', duration: '10 Days', price: 'KES 250,200', groupSize: '4-8' },
        'jungle-adventure': { name: 'Mountain Trek Safari', duration: '14 Days', price: 'KES 300,000', groupSize: '6-10' },
        'marine-wildlife': { name: 'Serengeti National Park', duration: '5 Days', price: 'KES 176,800', groupSize: '8-15' },
        'rocky-mountain': { name: 'Camping', duration: '5 Days', price: 'KES 10,200', difficulty: 'Moderate' },
        'coastal-cliffs': { name: 'Hiking Experience', duration: '3 Days', price: 'KES 16,800', difficulty: 'Easy' },
        'volcanic-landscape': { name: 'Mt. Kenya Trek', duration: '7 Days', price: 'KES 23,500', difficulty: 'Challenging' },
        'tropical-jungle': { name: 'Tropical Jungle Trek', duration: '6 Days', price: 'KES 33,300', difficulty: 'Moderate' }
    };

    bookNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentAdventure = this.getAttribute('data-safari') || this.getAttribute('data-hiking');
            const adventure = adventures[currentAdventure];
            bookingTitle.textContent = `Book ${adventure.name}`;
            bookingDescription.textContent = `Fill out the form below to book your ${adventure.name} experience`;
            bookingDetails.textContent = `${adventure.name} (${adventure.duration})`;
            bookingTotal.textContent = `From ${adventure.price}`;
            bookingSummary.style.display = 'block';
            whatsappRedirect.style.display = 'none';
            completeBooking.style.display = 'block';
            bookingModal.style.display = 'flex';
        });
    });

    closeBookingModal.addEventListener('click', () => bookingModal.style.display = 'none');
    window.addEventListener('click', e => {
        if (e.target === bookingModal) bookingModal.style.display = 'none';
    });

    completeBooking.addEventListener('click', function() {
        const fullName = document.getElementById('fullName').value;
        const location = document.getElementById('location').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const participants = document.getElementById('participants').value;

        if (!fullName || !location || !startDate || !endDate) {
            alert('Please fill out all required fields');
            return;
        }

        completeBooking.style.display = 'none';
        whatsappRedirect.style.display = 'block';

        const adventure = adventures[currentAdventure];
        const message = `Hello! I'd like to book ${adventure.name} from ${startDate} to ${endDate} for ${participants} participant(s). My name is ${fullName} and I'm located in ${location}. Please confirm my booking.`;
        const whatsappUrl = `https://wa.me/254796885519?text=${encodeURIComponent(message)}`;

        setTimeout(() => {
            window.location.href = whatsappUrl;
        }, 1500);
    });

    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.style.boxShadow = window.scrollY > 100 
            ? '0 5px 20px rgba(0, 0, 0, 0.1)' 
            : '0 2px 10px rgba(0, 0, 0, 0.05)';
    });

});
