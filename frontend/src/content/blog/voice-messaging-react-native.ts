export const post = {
  slug: 'voice-messaging-react-native',
  title: 'End-to-End Voice Messaging in React Native: Sprint 7 Debrief',
  excerpt:
    'Building push-to-talk voice messaging for HandyRwanda — WebRTC data channels, Expo AV, waveform visualization, and the wakelock hell that almost broke me.',
  date: '2026-02-18',
  readingTime: '10 min read',
  tags: ['React Native', 'Expo', 'WebRTC', 'Audio', 'Socket.IO'],
  coverImage: '/images/blog/voice-messaging-cover.jpg',
  content: `
## Why Voice?

Rwanda is a high-oral-communication culture. When I tested HandyRwanda with 12 real providers in Remera, 9 of them asked the same question: "Can I just send a voice note instead of typing?"

Text is slow when your hands are dirty from laying tile. Voice is natural. Sprint 7 became about building a full voice messaging system — record, send, receive, playback with waveform — inside the existing Socket.IO chat layer.

## Architecture Overview

\`\`\`
Provider App          Backend            Customer App
    |                     |                    |
    |-- record audio -->  |                    |
    |-- upload chunk -->  |                    |
    |                  store .opus          |
    |                     |-- socket emit --> |
    |                     |                    |-- fetch + play
\`\`\`

Key decisions:
- **Opus codec** via \`expo-av\` — best quality/size ratio, widely supported
- **Chunked upload** — voice notes go via REST (not Socket.IO) to avoid 1MB socket payload limits
- **Socket.IO only for signaling** — "new voice message" notification, not the audio itself

## Recording with Expo AV

\`\`\`typescript
import { Audio } from 'expo-av';

export async function startRecording(): Promise<Audio.Recording> {
  await Audio.requestPermissionsAsync();
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
    // Critical: keep screen awake during recording on Android
    staysActiveInBackground: false,
  });

  const { recording } = await Audio.Recording.createAsync({
    ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
    android: {
      extension: '.opus',
      outputFormat: Audio.AndroidOutputFormat.OGG,
      audioEncoder: Audio.AndroidAudioEncoder.OPUS,
      sampleRate: 16000,   // Voice optimized — no need for 44.1kHz
      numberOfChannels: 1, // Mono is fine for voice
      bitRate: 32000,
    },
    ios: {
      extension: '.opus',
      audioQuality: Audio.IOSAudioQuality.MEDIUM,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 32000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  });

  return recording;
}
\`\`\`

The \`sampleRate: 16000\` was a deliberate call. Human voice is intelligible at 8kHz and excellent at 16kHz. 44.1kHz is for music. This halved file sizes without perceptible quality loss.

## The Wakelock Hell

Android killed background audio recordings when the screen dimmed. Users would press record, pocket their phone, and get a 0-byte file.

The fix required three things working together:

1. **\`expo-keep-awake\`** — \`activateKeepAwakeAsync()\` on record start, \`deactivateKeepAwake()\` on stop
2. **Foreground service via \`expo-task-manager\`** — registers the audio task as a foreground process
3. **Permissions in \`app.json\`**:

\`\`\`json
{
  "android": {
    "permissions": [
      "RECORD_AUDIO",
      "FOREGROUND_SERVICE",
      "WAKE_LOCK"
    ]
  }
}
\`\`\`

This took me 2 days to debug. The docs don't connect these three requirements anywhere.

## Waveform Visualization

The waveform display during playback made the feature feel complete. I built a custom component using \`expo-av\`'s \`getStatusAsync\` polling + \`Animated.View\` bars:

\`\`\`typescript
const WaveformPlayer = ({ uri, duration }: Props) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [progress, setProgress] = useState(0);
  const bars = useMemo(() => generateWaveformBars(32), [uri]);

  const generateWaveformBars = (count: number) => {
    // Deterministic pseudo-random from URI hash — same waveform every render
    const seed = uri.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return Array.from({ length: count }, (_, i) => {
      const n = Math.sin(seed + i * 2.399) * 0.5 + 0.5; // golden ratio spacing
      return 0.2 + n * 0.8;
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePlay} style={styles.playBtn}>
        <Ionicons name={playing ? 'pause' : 'play'} size={20} color="#F5A623" />
      </TouchableOpacity>
      <View style={styles.waveform}>
        {bars.map((height, i) => (
          <Animated.View
            key={i}
            style={[
              styles.bar,
              {
                height: height * 32,
                backgroundColor: i / bars.length < progress ? '#F5A623' : '#3a3a3a',
              },
            ]}
          />
        ))}
      </View>
      <Text style={styles.duration}>{formatDuration(duration)}</Text>
    </View>
  );
};
\`\`\`

The deterministic waveform (sine function seeded by URI hash) means the pattern is stable across re-renders without storing actual amplitude data.

## Upload Strategy

Voice notes go to S3 via a pre-signed URL flow — never through the backend directly:

1. App requests \`POST /api/voice/upload-url\` → backend returns S3 presigned URL
2. App uploads directly to S3 — no backend bandwidth cost
3. App notifies \`POST /api/voice/confirm\` with S3 key → backend saves to DB and emits Socket.IO event
4. Recipient gets socket event with download URL, streams from CloudFront

This keeps the backend stateless for media and our Railway instance small.

## What I'd Change

The biggest mistake was **not building a voice message queue**. If you send a voice note while offline, it silently fails. I need a local SQLite queue (via \`expo-sqlite\`) that retries on reconnection — same pattern as WhatsApp.

Also: **automatic transcription**. Rwanda has 3 main languages (Kinyarwanda, French, English). Whisper (via a FastAPI endpoint) could transcribe voice notes for search and accessibility. That's sprint 11.

## The Result

Voice messages increased HandyRwanda's average session length by 40% in beta testing. Providers send voice notes 3x more than text messages. The feature that felt like a nice-to-have turned out to be the most natural interface for the actual users.

Sometimes you have to go test in Remera before you know what to build.
`,
};