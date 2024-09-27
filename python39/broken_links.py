import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def check_links(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    total_links = 0
    broken_links = 0
    active_links = 0
    broken_links_list = []

    for link in soup.find_all('a'):
        href = link.get('href')
        if href:
            total_links += 1
            full_url = urljoin(url, href)
            try:
                link_response = requests.head(full_url, allow_redirects=True)
                if link_response.status_code >= 400:
                    print(f"**** Broken Link *** {full_url}")
                    broken_links += 1
                    broken_links_list.append((full_url, link_response.status_code))
                else:
                    print(f"*** Active Link *** {full_url}")
                    active_links += 1
            except requests.RequestException:
                print(f"**** Broken Link (Exception) *** {full_url}")
                broken_links += 1
                broken_links_list.append(full_url)

    print(f"**** total links **** {total_links}")
    print(f"**** broken links **** {broken_links}")
    print(f"**** active links **** {active_links}")

    with open('broken_links.txt', 'w') as f:
        f.write(f"Tested URL: {url}\n\n")
        f.write(f"Total Links: {total_links}\n")
        f.write(f"Broken Links: {broken_links}\n")
        f.write(f"Active Links: {active_links}\n\n")
        f.write("List of Broken Links:\n")
        for link, status_code in broken_links_list:
            f.write(f"{link} (Status: {status_code})\n")

def main():
    with open('urls.txt', 'r') as file:
        urls = file.read().splitlines()
    
    for url in urls:
        check_links(url.strip())

if __name__ == "__main__":
    main()

