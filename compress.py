import ffmpeg
import subprocess

def compress_video(input_path, output_path, crf=23, preset="slow"):
    """
    Compress a video file using ffmpeg.

    Parameters:
        input_path (str): Path to the input video file.
        output_path (str): Path to save the compressed video file.
        crf (int): Constant Rate Factor (CRF) value (lower = better quality, default is 23).
        preset (str): Compression speed vs. efficiency preset (slower = better compression).
                      Options: 'ultrafast', 'superfast', 'fast', 'medium', 'slow', 'slower', 'veryslow'.
    """
    try:
        # Run ffmpeg command using subprocess
        subprocess.run(
            [
                "ffmpeg",
                "-i", input_path,
                "-vcodec", "libx264",
                "-crf", str(crf),
                "-preset", preset,
                "-acodec", "aac",
                "-b:a", "128k",
                output_path,
            ],
            check=True
        )
        print(f"Compression completed. Saved to {output_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error during compression: {e}")

# Example usage
input_video = "./img/hero.mp4"  # Replace with your video file
output_video = "./output_video.mp4"
compress_video(input_video, output_video, crf=18, preset="slow")
