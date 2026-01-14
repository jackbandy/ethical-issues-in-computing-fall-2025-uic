"""
Seeded Random Seats
Assign ~30 students randomly to 8 tables (max 4 per table)

Author: Jack Bandy <jxb@uic.edu>
With help from Claude for animation

Created October 2025 
"""

import pandas as pd
import random, time, sys
from datetime import datetime


def spin_animation(duration=2):
    frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    end_time = time.time() + duration
    i = 0
    while time.time() < end_time:
        sys.stdout.write(f'\r{frames[i % len(frames)]} Spinning the wheel...')
        sys.stdout.flush()
        time.sleep(0.1)
        i += 1
    sys.stdout.write('\r' + ' ' * 30 + '\r')
    sys.stdout.flush()


def animate_numbers(name, final_table, duration=0.4):
    total_width, name_len = 50, len(name)
    dash_string = "- " * max(0, (total_width - name_len - 8) // 2)
    end_time = time.time() + duration
    while time.time() < end_time:
        sys.stdout.write(f'\r{name} {dash_string} 🎰 {random.randint(1, 8):1d}')
        sys.stdout.flush()
        time.sleep(0.05)
    sys.stdout.write(f'\r{name} {dash_string} ✨ {final_table}\n')
    sys.stdout.flush()


def assign_tables(num_students, seed):
    random.seed(seed)
    attempt = 0
    while True:
        attempt += 1
        # all table assignments (i.e. [1,1,1,1,2,2,2,2,...8,8,8,8])
        tables = [i//4 + 1 for i in range(32)]
        random.shuffle(tables)
        assignments = tables[:num_students]
        table_counts = pd.Series(assignments).value_counts()
        if (table_counts == 2).any():
            # hackish re-shuffle if tables are uneven
            continue
        return assignments, attempt


def process_section(filepath, seed):
    df = pd.read_excel(filepath, header=14)
    df['Student Name'] = df['Student Name'].str.replace(r'\s*\([^)]*\)', '', regex=True)
    df['first_last'] = df['Student Name'].str.split(', ').str[::-1].str.join(' ')
    assignments, attempt = assign_tables(len(df), seed)
    df['table'] = assignments
    return df, attempt


def create_demo_data(seed):
    names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 
             'Iris', 'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Paul',
             'Quinn', 'Rose', 'Sam', 'Tara', 'Uma', 'Victor', 'Wendy', 'Xander',
             'Yara', 'Zoe', 'Aaron', 'Bella', 'Caleb', 'Dora']
    df = pd.DataFrame({'first_last': names})
    assignments, attempt = assign_tables(len(df), seed)
    df['table'] = assignments
    return df, attempt


def main():
    print("=" * 60)
    print(" RANDOM TABLE SELECTOR")
    print("=" * 60)
    print("\nWhich section to assign tables to?")
    print("  a) Section 1230\n  b) Section 200\n  d) Demo (30 made-up students)\n")
    
    section = input("Enter your choice (a/b/d): ").strip().lower()
    section_map = {
        'a': ('rosters/a67983058_classlist.xls', '1230'),
        'b': ('rosters/b61063680_classlist.xls', '200'),
    }
    
    if section == 'd':
        filepath, section_name = None, 'DEMO'
    elif section in section_map:
        filepath, section_name = section_map[section]
    else:
        print("❌ Invalid selection! Please run again and choose a, b, or d.")
        return
    
    seed_input = input("\nEnter a seed number: ").strip()
    seed = int(seed_input) if seed_input else None
    
    print(f"\nProcessing Section {section_name}...\n")
    spin_animation(1)
    
    df, attempt = create_demo_data(seed) if section == 'd' else process_section(filepath, seed)
    
    print(f"\n{'='*60}")
    print(f"🎲 GENERATING RANDOM TABLES FOR SECTION {section_name}! 🎲")
    if attempt > 1:
        print(f"(Re-shuffled {attempt-1} time(s) to avoid tables with only 2 students)")
    print(f"{'='*60}\n")
    time.sleep(0.5)
    
    for _, row in df.iterrows():
        animate_numbers(row['first_last'], row['table'])
        time.sleep(0.05)
    
    print(f"\n{'='*60}")
    print("✅ TABLE ASSIGNMENTS COMPLETE!")
    
    save = input("\n💾 Would you like to save these assignments? (y/n): ").strip().lower()
    if save == 'y':
        today = datetime.now().strftime('%b%d').lower()
        output_file = f'rosters/{today}_section_{section_name}_assignments.csv'
        df[['first_last', 'table']].to_csv(output_file, index=False)
        print(f"✨ Saved to {output_file}")


if __name__ == "__main__":
    main()
