import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import json

def get_site_map(start_url, max_pages=100):
    visited = set()
    to_visit = [start_url]
    site_map = {}

    while to_visit and len(visited) < max_pages:
        current_url = to_visit.pop(0)
        if current_url not in visited:
            print(f"Visiting: {current_url}")
            visited.add(current_url)

            try:
                response = requests.get(current_url)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    links = soup.find_all('a')
                    
                    site_map[current_url] = {
                        "title": soup.title.string if soup.title else "No title",
                        "links": []
                    }

                    for link in links:
                        href = link.get('href')
                        if href:
                            full_url = urljoin(current_url, href)
                            if urlparse(full_url).netloc == urlparse(start_url).netloc:
                                site_map[current_url]["links"].append(full_url)
                                if full_url not in visited:
                                    to_visit.append(full_url)

            except requests.RequestException as e:
                print(f"Error visiting {current_url}: {e}")

    return site_map

def save_site_map(site_map, filename):
    with open(filename, 'w') as f:
        json.dump(site_map, f, indent=2)

def main():
    with open('urls.txt', 'r') as file:
        urls = file.read().splitlines()
    
    for url in urls:
        site_map = get_site_map(url.strip())
        save_site_map(site_map, f"site_map_{urlparse(url).netloc}.json")
        print(f"Site map saved for {url}")

if __name__ == "__main__":
    main()
