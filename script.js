// Ma'lumotlar bazasi
const literatureData = [
    {
        id: 1,
        model: "HMM-GMM",
        advantages: "An'anaviy, kam ma'lumotlar, tezkor",
        disadvantages: "Murakkab nutqda past natija",
        wer: 25.4,
        application: "Telefoniya, oddiy buyruqlar"
    },
    {
        id: 2,
        model: "CTC",
        advantages: "Alignment muammosiz, uzluksiz matn",
        disadvantages: "Takroriy belgilar muammosi",
        wer: 18.7,
        application: "Kitob o'qish, audiokitoblar"
    },
    {
        id: 3,
        model: "RNN-T",
        advantages: "Real-time, past kechikish, streaming",
        disadvantages: "Murakkab trening, ko'p resurs",
        wer: 12.3,
        application: "Real-time tarjima, assistentlar"
    },
    {
        id: 4,
        model: "Whisper (OpenAI)",
        advantages: "Katta dataset, ko'p tilli, zero-shot",
        disadvantages: "Katta model, sekin inferensiya",
        wer: 8.2,
        application: "Ko'p tilli tarjima, transkripsiya"
    },
    {
        id: 5,
        model: "Wav2Vec 2.0",
        advantages: "Self-supervised, yuqori to'g'rilik",
        disadvantages: "Katta trening vaqti",
        wer: 9.5,
        application: "Ilmiy tadqiqotlar, yuqori talab"
    },
    {
        id: 6,
        model: "Conformer",
        advantages: "CNN + Transformer, lokal va global",
        disadvantages: "Murakkab arxitektura",
        wer: 7.8,
        application: "Murakkab audio, musiqa tanib olish"
    }
];

const audioSamples = [
    {
        id: 1,
        title: "Salom, dunyo!",
        description: "Toza audio, erkak ovozi, Toshkent lahjasi",
        transcript: "Salom, men O'zbek tili uchun avtomatik nutqni tanib olish tizimi ustida ishlayapman.",
        duration: 5.2,
        words: 15,
        type: "clean",
        dialect: "tashkent"
    },
    {
        id: 2,
        title: "Restoranda buyurtma",
        description: "Shovqinli muhit, ayol ovozi",
        transcript: "Menga bir lag'mon va choy iltimos. Katta bo'lsin.",
        duration: 3.8,
        words: 10,
        type: "noisy",
        dialect: "samarkand"
    },
    {
        id: 3,
        title: "Telefon suhbati",
        description: "Telefon orqali, past sifat",
        transcript: "Salom, kechirasiz, siz bilan uchrashishni xohlayman.",
        duration: 4.5,
        words: 12,
        type: "telephone",
        dialect: "fergana"
    }
];

// Dastlabki yuklash
document.addEventListener('DOMContentLoaded', function() {
    loadLiteratureTable();
    initializeCharts();
    setupEventListeners();
    updateUI();
});

// Adabiyotlar jadvalini yuklash
function loadLiteratureTable() {
    const tbody = document.querySelector('#literatureTable tbody');
    tbody.innerHTML = '';
    
    literatureData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td><strong>${item.model}</strong></td>
            <td>${item.advantages}</td>
            <td>${item.disadvantages}</td>
            <td><span class="badge ${getWERBadgeClass(item.wer)}">${item.wer}%</span></td>
            <td>${item.application}</td>
        `;
        tbody.appendChild(row);
    });
}

// WER rangini aniqlash
function getWERBadgeClass(wer) {
    if (wer < 10) return 'bg-success';
    if (wer < 20) return 'bg-info';
    if (wer < 30) return 'bg-warning';
    return 'bg-danger';
}

// Chartlarni yaratish
function initializeCharts() {
    // WER chart
    const werCtx = document.getElementById('werChart').getContext('2d');
    new Chart(werCtx, {
        type: 'bar',
        data: {
            labels: ['HMM-GMM', 'CTC', 'RNN-T', 'Whisper', 'Wav2Vec2', 'Conformer'],
            datasets: [{
                label: 'WER (%) - Pastroq yaxshi',
                data: [25.4, 18.7, 12.3, 8.2, 9.5, 7.8],
                backgroundColor: [
                    '#e71d36', '#ff9f1c', '#2ec4b6', '#4361ee', '#7209b7', '#3a0ca3'
                ],
                borderColor: [
                    '#c1121f', '#e76f00', '#1d9b8f', '#3a56d4', '#560bad', '#2a0879'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Word Error Rate (WER) taqqoslash'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'WER (%)'
                    }
                }
            }
        }
    });
    
    // CER chart
    const cerCtx = document.getElementById('cerChart').getContext('2d');
    new Chart(cerCtx, {
        type: 'line',
        data: {
            labels: ['Toza audio', '15dB shovqin', '10dB shovqin', '5dB shovqin', 'Telefon'],
            datasets: [
                {
                    label: 'HMM-GMM',
                    data: [75.2, 65.4, 52.1, 38.7, 45.3],
                    borderColor: '#e71d36',
                    backgroundColor: 'rgba(231, 29, 54, 0.1)',
                    tension: 0.3
                },
                {
                    label: 'CTC',
                    data: [82.5, 75.8, 68.3, 55.2, 60.1],
                    borderColor: '#ff9f1c',
                    backgroundColor: 'rgba(255, 159, 28, 0.1)',
                    tension: 0.3
                },
                {
                    label: 'RNN-T',
                    data: [88.3, 82.1, 76.5, 65.8, 70.4],
                    borderColor: '#2ec4b6',
                    backgroundColor: 'rgba(46, 196, 182, 0.1)',
                    tension: 0.3
                },
                {
                    label: 'Whisper',
                    data: [92.1, 88.7, 84.2, 78.5, 82.3],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Character Error Rate (CER) - Shovqinga bardoshlilik'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 30,
                    title: {
                        display: true,
                        text: 'To\'g\'rilik (%)'
                    }
                }
            }
        }
    });
    
    // Waveform chart
    const waveformCtx = document.getElementById('waveform').getContext('2d');
    new Chart(waveformCtx, {
        type: 'line',
        data: {
            labels: Array(100).fill('').map((_, i) => i),
            datasets: [{
                data: Array(100).fill(0).map(() => Math.random() * 100 - 50),
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
}

// Audio yuklash
function loadAudioSamples() {
    const filters = {
        clean: document.querySelectorAll('.filter-check')[0].checked,
        noisy: document.querySelectorAll('.filter-check')[1].checked,
        tashkent: document.querySelectorAll('.filter-check')[2].checked,
        samarkand: document.querySelectorAll('.filter-check')[3].checked,
        fergana: document.querySelectorAll('.filter-check')[4].checked
    };
    
    // Filtrlangan audio namunalarni ko'rsatish
    const filteredSamples = audioSamples.filter(sample => {
        if (sample.type === 'clean' && !filters.clean) return false;
        if (sample.type === 'noisy' && !filters.noisy) return false;
        if (sample.dialect === 'tashkent' && !filters.tashkent) return false;
        if (sample.dialect === 'samarkand' && !filters.samarkand) return false;
        if (sample.dialect === 'fergana' && !filters.fergana) return false;
        return true;
    });
    
    // Birinchi namunani ko'rsatish
    if (filteredSamples.length > 0) {
        displayAudioSample(filteredSamples[0]);
    }
}

function displayAudioSample(sample) {
    document.getElementById('audioTitle').textContent = sample.title;
    document.getElementById('audioDesc').textContent = sample.description;
    document.getElementById('transcriptText').textContent = sample.transcript;
    
    // Progress bar
    const progressBar = document.getElementById('progressBar');
    let progress = 0;
    const interval = setInterval(() => {
        progress += 0.5;
        progressBar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            progressBar.style.width = '0%';
        }
    }, sample.duration * 10);
}

// Audio boshqaruv funksiyalari
function playAudio() {
    document.getElementById('progressBar').style.width = '70%';
}

function pauseAudio() {
    document.getElementById('progressBar').style.width = '30%';
}

// Formula isbotini ko'rsatish
function showProof(formulaType) {
    let proofText = '';
    
    switch(formulaType) {
        case 'ctc':
            proofText = `
                CTC (Connectionist Temporal Classification) loss funksiyasi:
                
                L_CTC = -log P(y|x) = -log ∑_{π∈B⁻¹(y)} P(π|x)
                
                Bu yerda:
                • π - alignment (ketma-ketlik)
                • B - mapping funksiyasi (takroriy belgilarni olib tashlash)
                • y - haqiqiy matn
                • x - audio signal
                
                Forward-Backward algoritmi orqali hisoblanadi.
            `;
            break;
        default:
            proofText = "Formula isboti mavjud emas";
    }
    
    alert(proofText);
}

// Real-time demo funksiyalari
let isRecording = false;
let recordingInterval;
let recordingTime = 0;

function startRecording() {
    isRecording = true;
    recordingTime = 0;
    
    document.getElementById('recordBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
    document.getElementById('recordBtn').classList.add('btn-secondary');
    document.getElementById('stopBtn').classList.add('btn-danger');
    
    // Vaqt hisoblagich
    recordingInterval = setInterval(() => {
        recordingTime++;
        const minutes = Math.floor(recordingTime / 60);
        const seconds = recordingTime % 60;
        document.getElementById('recordingTime').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Tasodifiy ovoz darajasi
        const volume = Math.floor(Math.random() * 100);
        document.getElementById('volumeLevel').textContent = volume + '%';
        
        // Fayl hajmi
        const fileSize = recordingTime * 160; // 160KB/s
        document.getElementById('fileSize').textContent = 
            fileSize < 1024 ? fileSize + ' KB' : (fileSize / 1024).toFixed(1) + ' MB';
    }, 1000);
    
    // Waveform yangilash
    updateWaveform();
}

function stopRecording() {
    isRecording = false;
    clearInterval(recordingInterval);
    
    document.getElementById('recordBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('recordBtn').classList.remove('btn-secondary');
    document.getElementById('stopBtn').classList.remove('btn-danger');
    
    // Natijani avtomatik ko'rsatish
    setTimeout(processAudio, 500);
}

function updateWaveform() {
    const chart = Chart.getChart('waveform');
    if (chart) {
        const newData = Array(100).fill(0).map(() => {
            if (isRecording) {
                return Math.random() * 100 - 50;
            }
            return 0;
        });
        chart.data.datasets[0].data = newData;
        chart.update();
    }
}

function processAudio() {
    const model = document.getElementById('modelSelect').value;
    const sampleTexts = [
        "Salom, men O'zbek tili uchun avtomatik nutqni tanib olish tizimi ustida ishlayapman.",
        "Bugun ob-havo juda yaxshi, quyosh porlayapti.",
        "Men universitetda dars beraman va ilmiy ishlar bilan shug'ullanaman.",
        "Tez orada yangi loyihamizni taqdim etamiz, bu juda muhim tadqiqot.",
        "Raqamli transformatsiya davrida sun'iy intellekt texnologiyalari muhim ahamiyatga ega."
    ];
    
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    const confidence = 70 + Math.floor(Math.random() * 30); // 70-100%
    
    document.getElementById('transcriptionResult').textContent = randomText;
    document.getElementById('confidenceFill').style.width = confidence + '%';
    document.getElementById('confidencePercent').textContent = confidence + '%';
    
    // Model nomini ko'rsatish
    const modelNames = {
        'whisper': 'Whisper modeli',
        'rnn-t': 'RNN-T modeli',
        'ctc': 'CTC modeli',
        'hmm': 'HMM-GMM modeli'
    };
    
    showToast(`Audio ${modelNames[model]} bilan qayta ishlandi. To'g'rilik: ${confidence}%`, 'success');
}

function saveResults() {
    const result = document.getElementById('transcriptionResult').textContent;
    const confidence = document.getElementById('confidencePercent').textContent;
    const model = document.getElementById('modelSelect').options[document.getElementById('modelSelect').selectedIndex].text;
    
    const data = {
        model: model,
        confidence: confidence,
        result: result,
        timestamp: new Date().toLocaleString(),
        duration: document.getElementById('recordingTime').textContent
    };
    
    // JSON fayl sifatida saqlash
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `asr-result-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Natijalar JSON fayl sifatida saqlandi', 'success');
}

function clearResults() {
    document.getElementById('transcriptionResult').textContent = 
        'Mikrofon orqali audio yozing va natijani ko\'ring...';
    document.getElementById('confidenceFill').style.width = '0%';
    document.getElementById('confidencePercent').textContent = '0%';
    document.getElementById('recordingTime').textContent = '00:00';
    document.getElementById('fileSize').textContent = '0 KB';
    document.getElementById('volumeLevel').textContent = '0%';
    
    // Waveformni tozalash
    const chart = Chart.getChart('waveform');
    if (chart) {
        chart.data.datasets[0].data = Array(100).fill(0);
        chart.update();
    }
    
    showToast('Barcha natijalar tozalandi', 'info');
}

// Toast xabarlari
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast alert alert-${type} position-fixed`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    toast.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <span>${message}</span>
            <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 3000);
}

// UI yangilash
function updateUI() {
    // Navbar faol bo'limni belgilash
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Event listener'lar
function setupEventListeners() {
    // Filtrlar
    document.querySelectorAll('.filter-check').forEach(checkbox => {
        checkbox.addEventListener('change', loadAudioSamples);
    });
    
    // Volume control
    const volumeSlider = document.querySelector('.volume-slider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function(e) {
            const value = e.target.value;
            // Haqiqiy audio boshqaruv ilova bilan almashtiriladi
        });
    }
    
    // Audio namunalar ro'yxati
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('audio-sample')) {
            const sampleId = parseInt(e.target.dataset.id);
            const sample = audioSamples.find(s => s.id === sampleId);
            if (sample) {
                displayAudioSample(sample);
            }
        }
    });
    
    // Progress bar animatsiyasi
    setInterval(() => {
        if (document.getElementById('progressBar')) {
            const currentWidth = parseInt(document.getElementById('progressBar').style.width) || 0;
            if (currentWidth < 100) {
                document.getElementById('progressBar').style.width = (currentWidth + 0.5) + '%';
            } else {
                document.getElementById('progressBar').style.width = '0%';
            }
        }
    }, 100);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sahifa yuklanganida audio namunalarni ko'rsatish
loadAudioSamples();